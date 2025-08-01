<template>
  <div class="flex items-center space-x-2" @wheel="handleVolumeWheel">
    <button
      class="transition-colors" :class="[isMuted ? 'text-gray-400' : 'text-gray-400 hover:text-white']"
      @click="handleMuteToggle"
    >
      <i :class="isMuted ? 'fa-solid fa-volume-mute' : 'fa-solid fa-volume-up'" />
    </button>
    <div
      ref="volumeBarContainer"
      class="w-32 h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer relative group"
      @click="handleVolumeClick"
      @mousedown="handleVolumeMouseDown"
    >
      <div
        class="h-full bg-gray-400 rounded-full transition-all"
        :style="{ width: `${isMuted ? 0 : volume}%` }"
      >
        <div
          class="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlayer } from '@/composables/usePlayer'

// 使用播放器状态
const { volume, isMuted } = usePlayer()

// 音量条容器引用
const volumeBarContainer = ref<HTMLElement>()

// 拖拽状态
const isDraggingVolume = ref(false)

// 音量控制方法
function handleVolumeClick(event: MouseEvent) {
  if (!volumeBarContainer.value)
    return

  const rect = volumeBarContainer.value.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const newVolume = Math.max(0, Math.min(100, (clickX / rect.width) * 100))

  setVolumeValue(newVolume)
}

function handleVolumeMouseDown(event: MouseEvent) {
  event.preventDefault()
  isDraggingVolume.value = true

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingVolume.value || !volumeBarContainer.value)
      return

    const rect = volumeBarContainer.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newVolume = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setVolumeValue(newVolume)
  }

  const handleMouseUp = () => {
    isDraggingVolume.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// 滚轮控制音量
function handleVolumeWheel(event: WheelEvent) {
  event.preventDefault()

  // 滚轮向上增加音量，向下减少音量
  const delta = event.deltaY < 0 ? 5 : -5
  const newVolume = Math.max(0, Math.min(100, volume.value + delta))

  setVolumeValue(newVolume)
}

function setVolumeValue(newVolume: number) {
  // 直接更新音量值
  volume.value = newVolume

  // 如果设置了音量且当前是静音状态，则取消静音
  if (newVolume > 0 && isMuted.value) {
    isMuted.value = false
  }
}

function handleMuteToggle() {
  isMuted.value = !isMuted.value
}
</script>

<style scoped>
/* 音量条样式已在模板中通过 Tailwind CSS 类实现 */
</style>
