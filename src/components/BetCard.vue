<template>
  <article class="card" :aria-label="title" @click="onSelect" tabindex="0" @keydown.enter.prevent="onSelect" @keydown.space.prevent="onSelect">
    <div class="row">
      <div class="main">
        <h3 class="title">{{ title }}</h3>
        <div class="amount">R$ {{ formatCurrency(amount) }}</div>
      </div>
      <div class="avatars" v-if="visibleParticipants.length" :style="{ width: avatarsWidth }">
        <img
          v-for="(p, idx) in visibleParticipants"
          :key="`p-${idx}`"
          class="avatar"
          :src="p.avatarUrl"
          :alt="p.name || 'Participante'"
          :title="p.name || 'Participante'"
          :style="{ left: `${idx * 18}px`, zIndex: 10 - idx }"
        />
        <div
          v-if="extraCount > 0"
          class="avatar more"
          :style="{ left: `${visibleParticipants.length * 18}px` }"
          aria-label="Mais participantes"
        >
          +{{ extraCount }}
        </div>
      </div>
    </div>

    <div class="row bottom">
      <div class="progress" role="list" aria-label="Progresso por dia">
        <span
          v-for="(dot, idx) in daysCount"
          :key="idx"
          class="dot"
          :class="{ done: isDone(idx), pending: isPending(idx) }"
          role="listitem"
        >
          <IonIcon v-if="isDone(idx)" :icon="checkmark" class="dot-icon" aria-label="Feito" />
          <IonIcon v-else-if="isPending(idx)" :icon="timeOutline" class="dot-icon" aria-label="Pendente" />
        </span>
      </div>
      <div class="date" v-if="dateLabel">{{ dateLabel }}</div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IonIcon } from '@ionic/vue'
import { checkmark, timeOutline } from 'ionicons/icons'

type Participant = { name?: string; avatarUrl: string }

const props = defineProps<{
  title: string
  amount: number
  dateLabel?: string
  status?: 'neutral' | 'success' | 'danger'
  participants?: Participant[]
  days?: number[]
  completedDays?: number[]
  pendingDays?: number[]
}>()

const participants = computed(() => props.participants ?? [])
const visibleParticipants = computed(() => participants.value.slice(0, 2))
const extraCount = computed(() => Math.max(0, participants.value.length - 2))
const avatarsWidth = computed(() => `${visibleParticipants.value.length * 18 + (visibleParticipants.value.length ? 28 : 0)}px`)
const daysCount = computed<number>(() => props.days?.length ?? 0)

function isDone(index: number): boolean {
  if (!props.completedDays) return false
  return props.completedDays.includes(index)
}

function isPending(index: number): boolean {
  if (!props.pendingDays) return false
  return props.pendingDays.includes(index) && !isDone(index)
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const emit = defineEmits<{ (e: 'select'): void }>()
function onSelect(): void {
  emit('select')
}
</script>

<style scoped>
.card {
  position: relative;
  background: #F9F9F9;
  border: 1px solid #E3E3E3;
  border-radius: 18px;
  box-shadow: 0 8px 22px rgba(0,0,0,0.04);
  padding: 12px 16px 12px 16px;
  cursor: pointer;
  user-select: none;
}
.row { display: flex; align-items: center; justify-content: space-between; }
.row.bottom { margin-top: 8px; }

.main { display: flex; flex-direction: column; }
.title { margin: 0; font-size: 20px; color: #2b2b2b; font-weight: 700; }
.amount { color: #2a7f2a; font-weight: 600; font-size: 14px; }

.avatars { position: relative; height: 36px; min-width: 46px; }
.avatar {
  position: absolute; top: 0; width: 36px; height:  36px; border-radius: 50%;
  border: 3px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.avatar.more { background: #eaeaea; color: #6b7280; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }

.progress { display: flex; align-items: center; gap: 10px; }
.dot {
  width: 24px; height: 24px; border-radius: 50%;
  border: 1px dashed #d7d7d7; background: #fff;
  display: inline-flex; align-items: center; justify-content: center;
}
.dot-icon { width: 14px; height: 14px; }
.dot.done { border-style: solid; background: #e9f5e9; border-color: #2a7f2a33; }
.dot.done .dot-icon { color: #2a7f2a; }
.dot.pending { border-style: solid; background: #fff7e6; border-color: #ffb84d66; }
.dot.pending .dot-icon { color: #c77700; }

.date { color: #9aa1a8; font-size: 12px; }
</style>


