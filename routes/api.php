<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChatController;
use App\Http\Controllers\AuthController;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login'])->name('user.login');
    Route::post('registration', [AuthController::class, 'registration'])->name('user.registration');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('user.refreshToken');
});

Route::group(['middleware' => 'jwt.auth', 'prefix' => 'auth'], function(){
    Route::post('logout', [AuthController::class, 'logout'])->name('user.logout');
    Route::get('me', [AuthController::class, 'me'])->name('user.me');
    Route::post('me', [AuthController::class, 'save'])->name('user.me.save');
    Route::get('checktoken', [AuthController::class, 'checkToken'])->name('checktoken');
});

Route::middleware('jwt.auth')->get('/renewchat', [ChatController::class, 'renewChat'])->name('renewchat');
Route::middleware('jwt.auth')->post('/sendmessage', [ChatController::class, 'sendMessage'])->name('sendmessage');

