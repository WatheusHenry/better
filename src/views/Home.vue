<template>
  <ion-page>
    <ion-content :fullscreen="true" class="home-content">
      <div class="wrapper">
        <header class="topbar">
          <div>
            <p class="greeting">Olá Matheus</p>
            <h1 class="title">Suas apostas</h1>
          </div>
          <button class="avatar-btn" aria-label="Perfil">
            <img class="avatar" src="https://i.pravatar.cc/80?img=5" alt="Avatar" />
          </button>
        </header>

        <section v-if="!hasBets" class="empty">
          <div class="zzz">z z z</div>
          <p class="empty-title">Sem nada</p>
          <p class="empty-sub">Está na hora de apostar em você!</p>
        </section>

        <section v-else class="lists">
          <div v-if="activeBets.length" class="list-group">
            <p class="group-title">Apostas ativas</p>
            <div class="list">
              <BetCard
                v-for="bet in activeBets"
                :key="bet.id"
                :title="bet.title"
                :amount="bet.amount"
                :date-label="bet.dateLabel"
                :participants="bet.participants"
                :days="bet.days"
                :completed-days="bet.completedDays"
                :pending-days="bet.pendingDays"
                status="neutral"
                @select="openBet(bet)"
              />
            </div>
          </div>

          <div v-if="pastBets.length" class="list-group">
            <p class="group-title">Apostas passadas</p>
            <div class="list">
              <BetCard
                v-for="bet in pastBets"
                :key="bet.id"
                :title="bet.title"
                :amount="bet.amount"
                :date-label="bet.dateLabel"
                :participants="bet.participants"
                :days="bet.days"
                :completed-days="bet.completedDays"
                :pending-days="bet.pendingDays"
                status="danger"
                @select="openBet(bet)"
              />
            </div>
          </div>
        </section>

        <section class="cta">
          <p class="limit">Somente 3 apostas ativas por vez</p>
          <button class="primary-btn" @click="handleNewBet">Fazer aposta!</button>
        </section>
      </div>
      <NewBetSheet v-model:isOpen="isNewBetOpen" @create="onCreateBet" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { computed, ref } from 'vue';
import NewBetSheet from '@/components/NewBetSheet.vue';
import BetCard from '@/components/BetCard.vue';
import { useRouter } from 'vue-router';
import { cacheBet } from '@/services/betCache';

const router = useRouter();
const isNewBetOpen = ref<boolean>(false);

type Participant = { name?: string; avatarUrl: string }
type Bet = {
  id: string
  title: string
  amount: number
  dateLabel?: string
  participants?: Participant[]
  days: number[]
  completedDays: number[]
  pendingDays: number[]
}

const activeBets = ref<Bet[]>([])
const pastBets = ref<Bet[]>([])
const hasBets = computed<boolean>(() => activeBets.value.length > 0 || pastBets.value.length > 0)

function handleNewBet(): void {
  isNewBetOpen.value = true;
}

function onCreateBet(payload: { name: string; days: number[]; amount: number }): void {
  // TODO: enviar para backend e atualizar lista de apostas
  const newBet: Bet = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title: payload.name,
    amount: payload.amount,
    dateLabel: buildDateRangeLabel(),
    participants: [
      { name: 'Você', avatarUrl: 'https://i.pravatar.cc/80?img=5' }
    ],
    days: payload.days,
    completedDays: [],
    pendingDays: payload.days.map((_, idx) => idx)
  }
  activeBets.value = [newBet, ...activeBets.value]
  cacheBet(newBet)
}

function buildDateRangeLabel(): string {
  // Placeholder: intervalo desta semana (ex.: 12/03 - 19/03)
  const today = new Date()
  const start = new Date(today)
  const end = new Date(today)
  end.setDate(end.getDate() + 7)
  return `${formatDayMonth(start)} - ${formatDayMonth(end)}`
}

function formatDayMonth(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}`
}

function openBet(bet: Bet): void {
  cacheBet(bet)
  router.push(`/bets/${bet.id}`)
}
</script>

<style scoped>
.home-content::part(background) { background: #ffffff; }

.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
}
.greeting { color: #8b8b8b; font-weight: 600; margin: 0 0 0 0; }
.title {
  font-family: var(--ion-font-family);
  font-weight: 800;
  font-size: 28px;
  color: #2b2b2b;
  margin: 0;
}
.avatar-btn { background: transparent; border: none; padding: 0; }
.avatar {
  width: 50px; height: 50px; border-radius: 50%;border: 4px solid #F5F5F5;
  box-shadow: 0 10px 12px rgba(0,0,0,0.08);
}

.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.zzz { color: #cfcfcf; font-size: 40px; letter-spacing: 8px; font-weight: 800; }
.empty-title { color: #bdbdbd; margin: 8px 0 3rem 0; font-weight: 600; }
.empty-sub { color: #bdbdbd; text-align: center; margin: 0; font-weight: 600;font-size: larger;max-width: 10rem; }

.cta { margin-top: auto; }
.limit { text-align: center; color: #bdbdbd; font-size: 12px; margin: 0 0 8px 0; }
.primary-btn {
  width: 100%;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffa800 0%, #f08c00 100%);
  color: #803d02;
  font-weight: 800;
  font-size: large;
  box-shadow: 0 8px 22px rgba(255,168,0,0.35);
}

.lists { display: flex; flex-direction: column; gap: 18px; }
.group-title { color: #a0a0a0; font-size: 12px; margin: 8px 0; }
.list { display: flex; flex-direction: column; gap: 12px; }
</style>
