<template>
    <div>
        <div class="text-center">
            <v-overlay :value="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-overlay>
        </div>

    <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
        <v-col cols="12" md="6">
            <v-card class="py-6">
                <v-card-title class="d-flex justify-center">
                    <div class="text-h4">
                        Login
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-form @input="validateForm" ref="form">
                        <v-text-field
                                label="Tên đăng nhập"
                                v-model="loginForm.username"
                                name="input-username"
                                class="input-group--focused"
                                :rules="rules.usernameRules"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Mật khẩu"
                                v-model="loginForm.password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="rules.passwordRules"
                                :type="showPassword ? 'text' : 'password'"
                                name="input-10-2"
                                class="input-group--focused"
                                @click:append="showPassword = !showPassword"
                                outlined
                        ></v-text-field>
                    </v-form>
                    <div class="text-right">
                        <v-btn color="primary" :disabled="!isFormValid" @click="login">
                            Login
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    </div>
</template>
<script>
import axios from "axios";
import {LOGIN} from "@/utils";

export default {
    name: "Login",
    data() {
        return {
            loginForm: {},
            isFormValid: false,
            loading: false,
            rules: {
                passwordRules: [
                    v => !!v || 'Vui lòng nhập mật khẩu',
                    v => (v && v.length >= 8) || 'Mật khẩu phải có ít nhất 8 ký tự',
                    v => /^[a-zA-Z0-9]+$/.test(v) || 'Mật khẩu chỉ chấp nhận các ký tự chữ và số',
                ],
                usernameRules: [
                    v => !!v || 'Vui lòng nhập tên đăng nhập',
                    v => (v && v.length >= 4) || 'Tên đăng nhập phải có ít nhất 4 ký tự',
                    v => /^[a-zA-Z0-9._]+$/.test(v) || 'Tên đăng nhập chỉ chấp nhận các ký tự chữ, số, dấu chấm và gạch dưới',
                ],
            },
            showPassword: false,

        };
    },
    created() {
    },
    methods: {
        async login() {
            try {
                this.loading = true;
                const response = await axios.post(LOGIN, this.loginForm);
                const data = response.data;
                const token = data.accessToken;
                sessionStorage.setItem('access_token', token);
                this.$router.push('/manager');
            } catch (error) {
                console.error(error);
                this.loading = false;
            }
        },
        validateForm() {
            this.isFormValid = !!this.$refs.form.validate();
        },
    }
}
</script>
