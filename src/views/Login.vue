<template>
  <ion-page>
    <ion-content :fullscreen="true" class="login-content">
      <div class="wrapper">
        <div class="center">
          <section class="hero">
            <h1 class="title">Better</h1>
            <p class="subtitle">Aposte em você!</p>
          </section>

          <section class="cta">
            <button class="google-btn" @click="handleGoogleSignIn">
              <svg class="google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.334 5.109 29.418 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.297 16.113 18.789 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.334 5.109 29.418 3 24 3 16.318 3 9.656 7.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 43c5.166 0 9.94-1.977 13.523-5.197l-6.238-5.279C29.252 34.488 26.774 35.5 24 35.5c-5.197 0-9.611-3.316-11.268-7.953l-6.542 5.04C9.5 38.611 16.227 43 24 43z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.236-2.247 4.148-4.018 5.524l.003-.002 6.238 5.279C35.164 40.808 40 37 42.949 31.5c1.023-2.02 1.662-4.32 1.662-6.998 0-1.341-.138-2.651-.389-3.917z"/>
              </svg>
              <span>Entrar com google</span>
            </button>
          </section>
        </div>

        <section class="footer">
          <p>
            Ao efetuar login você concorda com nossos
            <a href="#" role="link">Termos e condições</a>
          </p>
        </section>
      </div>
    </ion-content>
  </ion-page>
  
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function handleGoogleSignIn(): void {
  // TODO: integrar com provedor de autenticação (ex.: Firebase Auth)
  // Supondo primeiro acesso, levar para a configuração do Pix
  router.push('/onboarding/pix');
}
</script>

<style scoped>
.login-content::part(background) {
  background: #ffffff;
}

.login-content { display: flex; flex-direction: column; height: 100%; }

.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
}

.hero { padding: 10rem 24px; text-align: center; }

.title {
  font-family: var(--ion-font-family);
  font-weight: 800;
  font-size: 5rem;
  
  letter-spacing: -0.5px;
  color: #ffa800;
  
}

.subtitle {
  font-weight: 600;
  font-size: 20px;
  color: #1f1f1f;
  margin: 0;
}

.cta { padding: 0 24px; display: flex; justify-content: center; width: 100%; }

.google-btn {
  width: 100%;
  max-width: 320px;
  height: 48px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #1f1f1f;
  font-weight: 600;
}

.google-icon {
  width: 18px;
  height: 18px;
}

.footer { margin-top: auto; padding: 16px 24px 24px; text-align: center; }

.footer p {
  color: #9e9e9e;
  font-size: 12px;
  margin: 0;
}

.footer a {
  color: inherit;
  text-decoration: underline;
}
</style>


