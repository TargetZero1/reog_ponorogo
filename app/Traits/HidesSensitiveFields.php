<?php

namespace App\Traits;

trait HidesSensitiveFields
{
    
    public function getSensitiveFields(): array
    {
        return config('security.hidden_fields', [
            'password',
            'password_confirmation',
            'remember_token',
            'api_token',
            'api_key',
            'secret_key',
            'private_key',
            'access_token',
            'refresh_token',
            'two_factor_secret',
        ]);
    }

    
    public function toArray(): array
    {
        $array = parent::toArray();

        foreach ($this->getSensitiveFields() as $field) {
            if (isset($array[$field])) {
                unset($array[$field]);
            }
        }

        return $array;
    }
}
