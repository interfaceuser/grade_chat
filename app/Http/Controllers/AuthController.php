<?php namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\SaveUserProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function checkToken()
    {
        return 'OK';
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(AuthRequest $request)
    {
        $credentials = $request->all();

        if (!$token = auth()->setTTL(1)->attempt($credentials)) {
            return response()->json(['error' => true, 'errors' => ["Неверный логин или пароль"]], 200);
        }

        return $this->respondWithToken($token);
    }

    /**
     * User registration
     */
    public function registration(RegistrationRequest $request)
    {
        $name = $request->input('email');
        $email = $request->input('email');
        $password = $request->input('password');

        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->save();

        $token = auth()->attempt($request->all());

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth()->user();
        $user->avatar = Storage::url($user->avatar);

        $result = [
            'userId' => $user->id,
            'userName' => $user->name,
            'userEmail' => $user->email,
            'userAvatar' => $user->avatar,
        ];
        return response()->json($result);
    }

    public function save(SaveUserProfileRequest $request)
    {
        $avatar = $request->file('avatar');
        $name = $request->input('name');

        $user = User::find(auth()->id());

        $user->name = $name;
        if ($avatar) {
            $image_resize = Image::make($avatar->getRealPath());
            $image_resize->resize(50, 50);
            $fileext = $avatar->clientExtension();
            $filename = 'avatar' . $user->id . '.' . $fileext;
            $image_resize->save(public_path('storage/' . $filename));
            $user->avatar = $filename;
        }


        $user->save();
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $result = [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ];
        $user = auth()->user();
        if ($user) {
            $result['userId'] = $user->id;
            $result['userName'] = $user->name;
            $result['userEmail'] = $user->email;
            $result['userAvatar'] = $user->avatar;
        }
        return response()->json($result);
    }
}
