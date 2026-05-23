<script setup lang="ts">
    const props = defineProps<{ modelValue: string[] }>()
    const emit = defineEmits<{ 'update:modelValue': [v: string[]] }>()

    const services = computed({
        get: () => props.modelValue,
        set: (v) => emit('update:modelValue', v)
    })

    const allServices = ref([
        'Botox / Filler',
        'Laser Treatment',
        'PDO Thread',
        'IV Drip / Vitamin',
        'รักษาสิว',
        'Mesotherapy',
        'HIFU / Ulthera',
        'Dermatology',
        'ปูยัน'
    ])

    const newService = ref('')
    const showAdd = ref(false)

    const isSelected = (s: string) => services.value.includes(s)

    function toggle(s: string) {
        if (isSelected(s)) {
            emit('update:modelValue', services.value.filter((x) => x !== s))
        } else {
            emit('update:modelValue', [...services.value, s])
        }
    }

    function addNew() {
        const name = newService.value.trim()
        if (!name) return
        if (!allServices.value.includes(name)) allServices.value.push(name)
        if (!isSelected(name)) emit('update:modelValue', [...services.value, name])
        newService.value = ''
        showAdd.value = false
    }
</script>

<template>
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-50">
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black">06</span>
                <div>
                    <h2 class="font-black text-gray-900 text-base">บริการที่ให้</h2>
                    <p class="text-[11px] text-gray-400 font-medium mt-0.5">
                        เลือกหมวดหมู่บริการที่คลินิกให้บริการ · ใช้กรองในระบบ Teleconsult และแสดงบนหน้าคลินิก Online
                    </p>
                </div>
            </div>
            <span class="text-xs font-bold text-gray-400 shrink-0">{{ services.length }} / {{ allServices.length }} เดือนที่เลือก</span>
        </div>

        <div class="p-6">
            <div class="flex flex-wrap gap-2">
                <button
                    v-for="s in allServices"
                    :key="s"
                    class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border-2 cursor-pointer transition-all"
                    :class="isSelected(s)
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'"
                    @click="toggle(s)"
                >
                    <UIcon
                        v-if="isSelected(s)"
                        name="i-lucide-check"
                        class="w-3 h-3"
                    />
                    {{ s }}
                </button>

                <!-- Add new -->
                <template v-if="showAdd">
                    <div class="flex items-center gap-1.5">
                        <input
                            v-model="newService"
                            type="text"
                            class="px-3 py-1.5 text-xs border-2 border-indigo-300 rounded-full focus:outline-none focus:border-indigo-500 font-medium w-36"
                            placeholder="ชื่อบริการ..."
                            autofocus
                            @keydown.enter="addNew"
                            @keydown.esc="showAdd = false"
                        />
                        <button
                            class="px-2.5 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 cursor-pointer"
                            @click="addNew"
                        >เพิ่ม</button>
                        <button
                            class="px-2.5 py-1.5 text-xs font-bold text-gray-500 border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer"
                            @click="showAdd = false"
                        >ยกเลิก</button>
                    </div>
                </template>
                <button
                    v-else
                    class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 border-2 border-dashed border-indigo-200 rounded-full hover:bg-indigo-50 cursor-pointer transition-colors"
                    @click="showAdd = true"
                >
                    <UIcon name="i-lucide-plus" class="w-3 h-3" />
                    เพิ่มประเภท
                </button>
            </div>
        </div>
    </div>
</template>
