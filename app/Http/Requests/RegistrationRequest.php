<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class RegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed',
            'password_confirmation' => 'required|string|same:password'
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        // все ошибки валидации
        $errors = [];
        foreach((new ValidationException($validator))->errors() as $fieldErrors){
            $errors = array_merge($errors, $fieldErrors);
        }

        throw new HttpResponseException(response()->json([
            'error' => true,
            'errors' => $errors,
        ], JsonResponse::HTTP_OK));
    }
}
