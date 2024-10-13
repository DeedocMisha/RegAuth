<template>
  <div style="margin-left: -30px; width: 1400px" class="border rounded p-3">
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Логин:</label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="form-control"
          placeholder="Логин…"
          autocomplete="username"
        />
      </div>

      <div class="form-group">
        <label for="email">Электронная почта:</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="form-control"
          placeholder="Email…"
          autocomplete="email"
        />
      </div>

      <div class="form-group">
        <label for="phone">Номер телефона:</label>
        <input
          v-model="phone"
          type="text"
          id="phone"
          class="form-control"
          placeholder="+7 (921) 123 45 67"
          autocomplete="tel"
        />
      </div>

      <div class="form-group">
        <label for="customerOrExecutor">Вы заказчик или исполнитель?</label>
        <select
          style="position: absolute; left: 400px"
          v-model="customerOrExecutor"
          id="customerOrExecutor"
          class="form-control"
          autocomplete="off"
        >
          <option value="customer">Заказчик</option>
          <option value="executor">Исполнитель</option>
        </select>
      </div>

      <div class="form-group">
        <label for="password">Пароль: </label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="form-control"
          placeholder="Пароль…"
          autocomplete="new-password"
        />
      </div>

      <div class="form-group">
        <label for="repeatPassword">Повторите пароль:</label>
        <input
          v-model="repeatPassword"
          type="password"
          id="repeatPassword"
          class="form-control"
          placeholder="Повторите пароль…"
          autocomplete="new-password"
        />
      </div>
      <br />
      <button type="submit" class="btn btn-primary">Регистрация</button>

      <p class="mt-3">
        Уже есть аккаунт?
        <router-link style="color: blue" to="/signin">Вход</router-link>
      </p>
    </form>
  </div>
</template>

<style>
* {
  margin-top: 20px;
  margin-left: 30px;
}
label {
  margin-top: -20px;
  margin-left: -30px;
}
input {
  position: absolute;
  left: 400px;
}
</style>

<script>
import axios from "axios"; // Импортируйте axios

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "", // Добавлено поле email
      password: "",
      repeatPassword: "",
      phone: "",
      customerOrExecutor: "",
      customerOrExecutorOptions: [
        { text: "Выберите...", value: "", disabled: true, selected: true },
        { text: "Заказчик", value: "customer" },
        { text: "Исполнитель", value: "executor" },
      ],
    };
  },
  methods: {
    register(event) {
      event.preventDefault();

      if (this.password !== this.repeatPassword) {
        alert("Пароли не совпадают");
        return;
      }

      axios
        .post(`http://127.0.0.1:8000/auth/users/`, {
          username: this.username,
          email: this.email,
          password: this.password,
          phone: this.phone,
          customerOrExecutor: this.customerOrExecutor,
        })
        .then((response) => {
          console.log("Регистрация успешна:", response.data);
          this.$router.push("/");
        })
        .catch((err) => {
          console.error("Ошибка при регистрации:", err.response.data);
          alert("Ошибка: " + err.response.data.detail);
        });
    },
  },
};
</script>
