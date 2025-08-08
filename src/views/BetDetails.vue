<template>
  <ion-page>
    <ion-content :fullscreen="true" class="details-content">
      <div class="wrapper" v-if="bet">
        <header class="header">
          <button class="back" @click="goBack" aria-label="Voltar">
            <IonIcon :icon="chevronBackOutline" />
          </button>
          <div class="who" v-if="bet.participants?.length">
            <span class="label">Apostado com</span>
            <span class="name">{{ firstParticipant }}</span>
            <div class="avatars">
              <img
                v-for="(p, idx) in bet.participants"
                :key="idx"
                class="avatar"
                :src="p.avatarUrl"
                :alt="p.name || 'Participante'"
                :title="p.name || 'Participante'"
                :style="{ left: `${idx * 18}px`, zIndex: 10 - idx }"
              />
            </div>
          </div>
          <div class="date">{{ bet.dateLabel }}</div>
        </header>

        <section class="title">
          <h1>{{ bet.title }}</h1>
        </section>

        <section class="week">
          <p class="section-title">Aposta semanal</p>
          <div class="progress">
            <span
              v-for="(d, idx) in bet.days.length"
              :key="idx"
              class="dot"
              :class="{ done: bet.completedDays.includes(idx), pending: bet.pendingDays.includes(idx) }"
            >
              <IonIcon v-if="bet.completedDays.includes(idx)" :icon="checkmark" class="dot-icon" />
              <IonIcon v-else-if="bet.pendingDays.includes(idx)" :icon="timeOutline" class="dot-icon" />
            </span>
          </div>
        </section>

        <section class="amount">
          <p class="section-title">Valor:</p>
          <h2>R$ {{ formatCurrency(bet.amount) }}</h2>
        </section>

        <section class="proofs">
          <p class="section-title">Provas</p>
          <div class="proof-card">
            <div class="proof-header">
              <span class="proof-badge">✓</span>
              <span class="proof-title">Validado por {{ firstParticipant }}</span>
              <span class="proof-date">14/03</span>
            </div>
            <div class="proof-media">
              <img class="proof-image" src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop" alt="Prova enviada" />
            </div>
          </div>

          <div class="proof-item">
            <span class="proof-badge">✓</span>
            <span class="proof-title">Você e {{ firstParticipant }} validaram</span>
            <span class="proof-date">12/03</span>
          </div>
        </section>

        <!-- Footer fixo movido para <ion-footer> -->
      </div>
    </ion-content>
    <ion-footer class="footer" v-if="bet">
      <div class="footer-inner">
        <button class="disabled">Você já validou hoje</button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonIcon, IonFooter } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { getBet, type Bet } from '@/services/betCache'
import { checkmark, timeOutline, chevronBackOutline } from 'ionicons/icons'

const route = useRoute()
const router = useRouter()
const bet = ref<Bet | undefined>(getBet(route.params.id as string))
const firstParticipant = computed(() => bet.value?.participants?.[0]?.name ?? 'Gabriel')

if (!bet.value) {
  // Se não houver no cache, volta para home
  router.replace('/home')
}

function goBack(): void {
  router.back()
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<style scoped>
.details-content::part(background) { background: #ffffff; }
.wrapper { padding: 12px 16px 24px; display: flex; flex-direction: column; gap: 16px; }
.header { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
.back {
  background: transparent;
  border: none;
  font-size: 22px;
  color: #1f1f1f;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
}
.back:active { background: #f2f2f2; }
.who { display: flex; align-items: center; gap: 6px; }
.label { color: #8b8b8b; font-size: 12px; }
.name { font-weight: 600; color: #6b7280; font-size: 12px; }
.avatars { position: relative; height: 28px; min-width: 46px; }
.avatar { position: absolute; top: 0; width: 28px; height: 28px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.date { color: #9aa1a8; font-size: 12px; }

.title h1 { margin: 0; font-size: 26px; color: #1f1f1f; font-weight: 800; }

.section-title { color: #8b8b8b; font-size: 12px; margin: 0 0 6px; }
.progress { display: flex; gap: 10px; }
.dot { width: 28px; height: 28px; border-radius: 50%; border: 1px dashed #d7d7d7; display: inline-flex; align-items: center; justify-content: center; }
.dot-icon { width: 16px; height: 16px; }
.dot.done { border-style: solid; background: #e9f5e9; border-color: #2a7f2a33; }
.dot.done .dot-icon { color: #2a7f2a; }
.dot.pending { border-style: solid; background: #fff7e6; border-color: #ffb84d66; }
.dot.pending .dot-icon { color: #c77700; }

.amount h2 { margin: 0; color: #2a7f2a; font-weight: 800; }
.proofs { display: flex; flex-direction: column; gap: 12px; }
.proof-card { border: 1px solid #e8e8e8; border-radius: 16px; background: #fff; box-shadow: 0 6px 18px rgba(0,0,0,0.04); overflow: hidden; }
.proof-header { display: flex; align-items: center; gap: 8px; padding: 10px 12px; }
.proof-badge { width: 22px; height: 22px; border-radius: 50%; background: #e9f5e9; color: #2a7f2a; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; }
.proof-title { color: #2a7f2a; font-weight: 600; font-size: 13px; }
.proof-date { margin-left: auto; color: #9aa1a8; font-size: 12px; }
.proof-media { padding: 8px 12px 12px; }
.proof-image { width: 100%; height: 180px; object-fit: cover; border-radius: 12px; }
.proof-item { display: flex; align-items: center; gap: 8px; border: 1px solid #e8e8e8; border-radius: 16px; background: #fff; box-shadow: 0 6px 18px rgba(0,0,0,0.04); padding: 10px 12px; }

.footer { 
  --background: transparent; 
  --box-shadow: none; 
  --border-color: transparent; 
  --border-width: 0;
  box-shadow: none;
  border: 0;
}
.footer-inner { padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); background: #fff; }
.footer .disabled { width: 100%; height: 52px; border-radius: 14px; border: none; background: #e0e0e0; color: #8b8b8b; font-weight: 800; }
</style>


