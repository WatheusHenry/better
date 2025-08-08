<template>
  <ion-modal
    :is-open="isOpen"
    @didDismiss="handleDismiss"
    :breakpoints="[0, 0.95]"
    :initialBreakpoint="0.95"
    handle-behavior="cycle"
    class="new-bet-modal"
  >
    <div class="sheet">

      <section class="form">
        <label class="field-label" for="betName">Nome da aposta</label>
        <input
          id="betName"
          class="input"
          type="text"
          autocomplete="off"
          :value="betName"
          @input="onBetNameInput"
          placeholder="Informe um nome para sua aposta"
        />

        <div class="spacer" />

        <label class="field-label">Selecione quantos dias a aposta terá</label>
        <div class="days">
          <button
            v-for="day in daysOfWeek"
            :key="day.index"
            class="day"
            :class="{ selected: selectedDays.has(day.index) }"
            type="button"
            @click="toggleDay(day.index)"
            :aria-pressed="selectedDays.has(day.index) ? 'true' : 'false'"
          >
            {{ day.short }}
          </button>
        </div>

        <div class="spacer" />

        <label class="field-label">Apostar com alguém</label>
        <button class="invite-btn" type="button" @click="handleInvite">
          Convidar +
        </button>

        <div class="spacer" />

        <label class="field-label">Valor (R$)</label>
        <div class="amount">
          <button class="step" type="button" @click="decrement" :disabled="amount <= MIN_VALUE" aria-label="Diminuir valor">
            <IonIcon class="step-icon" :icon="remove" />
          </button>
          <div class="amount-value">{{ formattedAmount }}</div>
          <button class="step" type="button" @click="increment" aria-label="Aumentar valor">
            <IonIcon class="step-icon" :icon="add" />
          </button>
        </div>
        <p class="min-hint">Valor mínimo de R${{ formatNumber(MIN_VALUE) }}</p>
      </section>

      <section class="actions">
        <button class="primary-btn" :disabled="!canSubmit" @click="submit">
          Apostar!
        </button>
      </section>
    </div>
  </ion-modal>
  
</template>

<script setup lang="ts">
import { IonModal, IonIcon } from '@ionic/vue'
import { computed, ref } from 'vue'
import { add, remove } from 'ionicons/icons'

type NewBetPayload = {
  name: string
  days: number[]
  amount: number
}

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'create', payload: NewBetPayload): void
}>()

const MIN_VALUE = 0.5
const STEP_VALUE = 0.5

const betName = ref<string>('')
const amount = ref<number>(MIN_VALUE)
const selectedDays = ref<Set<number>>(new Set())

const daysOfWeek = [
  { index: 0, short: 'D', name: 'Domingo' },
  { index: 1, short: 'S', name: 'Segunda' },
  { index: 2, short: 'T', name: 'Terça' },
  { index: 3, short: 'Q', name: 'Quarta' },
  { index: 4, short: 'Q', name: 'Quinta' },
  { index: 5, short: 'S', name: 'Sexta' },
  { index: 6, short: 'S', name: 'Sábado' }
]

const canSubmit = computed<boolean>(() => {
  return betName.value.trim().length > 0 && selectedDays.value.size > 0 && amount.value >= MIN_VALUE
})

const formattedAmount = computed<string>(() => formatCurrency(amount.value))

function resetState(): void {
  betName.value = ''
  amount.value = MIN_VALUE
  selectedDays.value = new Set()
}

function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatCurrency(value: number): string {
  return formatNumber(value)
}

function onBetNameInput(event: Event): void {
  const target = event.target as HTMLInputElement
  betName.value = target.value
}

function toggleDay(index: number): void {
  const next = new Set(selectedDays.value)
  if (next.has(index)) next.delete(index)
  else next.add(index)
  selectedDays.value = next
}

function increment(): void {
  amount.value = parseFloat((amount.value + STEP_VALUE).toFixed(2))
}

function decrement(): void {
  amount.value = Math.max(MIN_VALUE, parseFloat((amount.value - STEP_VALUE).toFixed(2)))
}

function handleInvite(): void {
  // Por enquanto apenas placeholder. Poderemos integrar com contatos no futuro.
  // Mantemos focado na criação de aposta.
}

function submit(): void {
  if (!canSubmit.value) return
  const payload: NewBetPayload = {
    name: betName.value.trim(),
    days: Array.from(selectedDays.value).sort((a, b) => a - b),
    amount: amount.value
  }
  emit('create', payload)
  emit('update:isOpen', false)
  resetState()
}

function handleDismiss(): void {
  emit('update:isOpen', false)
}
</script>

<style scoped>
.new-bet-modal::part(content) {
  --height: auto;
  border-radius: 20px 20px 0 0;
  background: #ffffff;
  color: #1f1f1f;
}

.sheet { padding: 2.5rem 3rem 4rem 3rem; }

.drag-indicator {
  width: 120px;
  height: 4px;
  background: #e5e5e5;
  border-radius: 6px;
  margin: 8px auto 16px;
}

.form { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 12px; color: #9aa1a8; }

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

.days { display: flex; gap: 10px; flex-wrap: nowrap; }
.day {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px dashed #d7d7d7;
  background: #fff;
  color: #a9a9a9;
  font-weight: 700;
}
.day.selected {
  border-style: solid;
  border-color: #2a7f2a33;
  background: #e9f5e9;
  color: #2a7f2a;
}

.invite-btn {
  height: 44px;
  border-radius: 12px;
  background: #f7f7f7;
  border: 1px solid #eeeeee;
  color: #5d5d5d;
  font-weight: 600;
}

.amount {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 4px;
}
.step {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e3e3e3;
  background: #fff;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.step-icon { width: 20px; height: 20px;color: #000000; }
.amount-value {
  font-size: 40px;
  font-weight: 800;
  color: #2a7f2a;
  min-width: 120px;
  text-align: center;
}
.min-hint { text-align: center; color: #b0b0b0; font-size: 12px; margin: 8px 0 0; }

.actions {
  padding-top: 16px;
  padding-bottom: env(safe-area-inset-bottom);
}
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
.primary-btn:disabled { opacity: 0.5; box-shadow: none; }

.spacer { height: 10px; }
</style>


