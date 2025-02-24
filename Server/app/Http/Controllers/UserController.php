<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function getAllUsers()
    {
        return User::where('approved', true)
            ->where('role', '!=', 'admin')
            ->latest()->get();
    }

    public function getRegisterRequests()
    {
        $registerRequests = User::where('approved', false)->where('role', 'student')->get();

        return response()->json($registerRequests);
    }

    public function approveStudentRegistration(User $user)
    {
        if ($user->role !== 'student') {
            return response()->json(['message' => 'User is not a student'], 400);
        }

        $user->approved = true;
        $user->save();

        return response()->json(['message' => 'Student registration approved successfully']);
    }


    public function registerCoordinator(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed ',
            'department' => 'required|string',
        ]);

        $fields['role'] = 'coordinator';
        $fields['approved'] = true;

        return   User::create($fields);
    }
    public function registerAdvisor(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed ',
            'department' => 'required|string',
        ]);

        $fields['role'] = 'advisor';
        $fields['approved'] = true;

        return   User::create($fields);
    }


    public function destroy(User $user)
    {
        $user->delete();
    }

    public function getAdvisors()
    {
        $user = Auth::user();
        $advisors = User::where('role', 'advisor')
            ->where('department', $user->department)
            ->get(['id', 'name']);

        return response()->json($advisors);
    }
}
