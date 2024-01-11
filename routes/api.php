<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuth\AuthController;
use App\Http\Controllers\NewsPaper\NewLogsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'auth'], function () {
    Route::post('signup', [AuthController::class, 'signup'])->name('api.signup');
    Route::post('login', [AuthController::class, 'login'])->name('api.sign-in');

    Route::group(['middleware' => ['auth.token']], function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('api.log-out');
        Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');
        Route::post('me', [AuthController::class, 'me'])->name('me');
    });
});

Route::group(['prefix' => 'news'], function () {
    Route::group(['middleware' => ['auth.token']], function () {
        Route::get('list',[NewLogsController::class,'newsList']);
        Route::post('create',[NewLogsController::class,'create']);
    });
});
