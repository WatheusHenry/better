<template>
  <ion-page>
    <ion-content :fullscreen="true" class="pix-content">
      <div class="wrapper">
        <section class="header">
          <h1 class="title">Qual a sua chave pix?</h1>
          <p class="subtitle">
            Nós utilizaremos sua chave pix para exibir aos outros usuários quando fizerem algum pagamento
            para você.
          </p>
        </section>

        <section class="form">
          <label class="field-label" for="pixKey">Chave pix</label>
          <input
            id="pixKey"
            class="input"
            type="text"
            autocomplete="off"
            :value="pixKey"
            @input="onInput"
            placeholder="Digite ou cole aqui sua chave"
          />
        </section>

        <section class="actions">
          <button class="primary-btn" :disabled="!canContinue" @click="handleNext">
            Avançar
          </button>
        </section>

        <section class="footer">
          <p>
            Nenhuma informação será utilizada de forma indevida, pedimos sua chave pix para poder facilitar o
            processo de outros usuários te pagarem e não precisarmos cobrar taxas de transferencias
          </p>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const pixKey = ref<string>('');

const canContinue = computed<boolean>(() => pixKey.value.trim().length > 0);

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  pixKey.value = target.value;
}

function handleNext(): void {
  if (!canContinue.value) return;
  // TODO: salvar chave pix no backend/armazenamento seguro
  router.push('/home');
}
</script>

<style scoped>
.pix-content::part(background) { background: #ffffff; }

.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
}

.header { text-align: center; padding-top: 64px; }
.title {
  font-family: var(--ion-font-family);
  font-weight: 800;
  font-size: 28px;
  line-height: 1.2;
  color: #2b2b2b;
  margin: 0 0 12px 0;
}
.subtitle {
  font-weight: 500;
  font-size: 14px;
  color: #8b8b8b;
  margin: 0 auto;
}

.form { margin-top: 5rem; display: flex; flex-direction: column; gap: 8px; }
.field-label { font-size: 14px; color: #a0a0a0; }
.input {
  height: 44px;
  border-radius: 12px;
  border: 1px solid #eaeaea;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  padding: 0 14px;
  font-size: 14px;
  color: #1f1f1f;
}
.input::placeholder { color: #bdbdbd; }
.input:focus { outline: none; }

.actions { padding-top: 5rem; display: flex; justify-content: center; }
.primary-btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(180deg, #ffa800 0%, #f08c00 100%);
  color: #803d02;
  font-weight: 700;
  font-size: medium;
  box-shadow: 0 6px 16px #ffa80059;
}
.primary-btn:disabled { opacity: 0.5; box-shadow: none; }

.footer {
  margin-top: auto;
  padding: 24px 0 24px;
  text-align: center;
}
.footer p {
  color: #b0b0b0;
  font-size: 12px;
  line-height: 1.4;
  margin: 0 auto;
  max-width: 340px;
}
</style>


