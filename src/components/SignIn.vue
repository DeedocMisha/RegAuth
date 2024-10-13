<template>
  <div class="login-container border rounded p-3">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Логин:</label>
        <input
          v-model="username"
          type="text"
          id="username"
          name="username"
          class="form-control"
          placeholder="Логин…"
          autocomplete="username"
        />
      </div>

      <div class="form-group">
        <label for="password">Пароль: </label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          class="form-control"
          placeholder="Пароль…"
          autocomplete="current-password"
        />
      </div>

      <div v-if="errorMessage" class="alert alert-danger mt-2">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="alert alert-success mt-2">
        {{ successMessage }}
      </div>

      <p class="mt-3">
        Нет аккаунта? <router-link to="/" style="color: blue">Назад</router-link>
      </p>

      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? "Загрузка…" : "Войти" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: null,
      successMessage: null,
      isLoading: false,
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
          username: this.username,
          password: this.password,
        });

        this.successMessage = response.data.message;
        this.errorMessage = null;

        const token = response.data.token;
        if (token) {
          localStorage.setItem("authToken", token);
        }

        this.$router.push("/");

        this.username = "";
        this.password = "";
      } catch (error) {
        // Вывод полной ошибки для диагностики
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.detail || "Ошибка при авторизации";
        } else {
          this.errorMessage =
            "Не удалось связаться с сервером, пожалуйста, попробуйте позже.";
        }
        console.error("Error:", error.response ? error.response.data : error.message);
        this.successMessage = null;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
