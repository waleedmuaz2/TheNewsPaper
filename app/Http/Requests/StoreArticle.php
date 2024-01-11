<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class StoreArticle extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'=>'required|max:30|min:3',
            'description'=>'required|max:30|min:3',
            'source'=>'required|max:30|min:2',
            'url'=>'required|max:30|min:2',
            'published_at'=>'required',
            'author'=>'required|min:3|max:20',
        ];
    }

    /**
     * Get the validation that apply to the request APIs.
     *
     * @return array<string, ValidationRule|array|string>
     * @throws ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $isJsonRequest = request()->is('api/*');
        if ($isJsonRequest) {
            throw new HttpResponseException(jsonFormat($validator->errors(), 'errors', JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
        } else {
            parent::failedValidation($validator);
        }
    }
}
