<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    public static function getActiveUsers()
    {
        $users = User::where('last_activity', '>=', Carbon::now()->subHours(1))->orWhere('id', '=', auth()->id())->get();
        foreach($users as $user){
            if($user->avatar){
                $user->avatar = Storage::url($user->avatar);
            }
        }

        $result = [];

        foreach($users as $user){
            $result[$user->id] = $user;
        }
        return $result;
    }
}
