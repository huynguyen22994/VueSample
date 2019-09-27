<template>
    <form class="ac-login-form">
        <div class="ac-form-wrapper">
        <div class="imgcontainer">
            <img src="assets/logo.png" alt="Avatar" class="avatar">
        </div>

        <div class="container">
            <div class="ac-login-form-row">
            <span class="ac-input-icon">
                <input type="text" placeholder="User Name" name="uname" required>
                <i class="fa fa-user"></i>
            </span>
            </div>
            <div class="ac-login-form-row">
            <span class="ac-input-icon">
                <input type="password" placeholder="Password" name="psw" required>
                <i class="fa fa-lock"></i>
            </span>
            </div>
                
            <button type="submit">Sign in</button>
        </div>
        <label class="ac-sign-up-label">
            Don't have account yet? <a href="" class="ac-sign-in">Sign up</a>
        </label>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'acLogin'
    }
<script>