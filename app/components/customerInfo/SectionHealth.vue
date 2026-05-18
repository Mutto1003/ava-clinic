<script setup lang="ts">
const props = defineProps<{
    form: any
    isEditMode: boolean
}>()

const availableAllergies = ref(['Penicillin', 'Lidocaine', 'Sulfa', 'Aspirin', 'Latex', 'Iodine', 'อาหารทะเล'])
const availableDiseases = ref(['ความดันสูง', 'ความดันต่ำ', 'เบาหวาน', 'หอบหืด', 'ผิวแพ้ง่าย', 'แผลคีลอยด์', 'ตั้งครรภ์/ให้นมบุตร', 'ไทรอยด์'])
const newAllergyInput = ref('')
const newDiseaseInput = ref('')
const showAddAllergy = ref(false)
const showAddDisease = ref(false)

const toggleTag = (list: string[], tag: string) => {
    const idx = list.indexOf(tag)
    if (idx > -1) list.splice(idx, 1)
    else list.push(tag)
}

const toggleAllergy = (tag: string) => { if (props.isEditMode) toggleTag(props.form.drugAllergies, tag) }
const toggleDisease = (tag: string) => { if (props.isEditMode) toggleTag(props.form.chronicDiseases, tag) }

const addCustomTag = (pool: string[], selected: string[], input: Ref<string>, show: Ref<boolean>) => {
    const tag = input.value.trim()
    if (!tag) return
    if (!pool.includes(tag)) pool.push(tag)
    selected.push(tag)
    input.value = ''
    show.value = false
}

const addCustomAllergy = () => addCustomTag(availableAllergies.value, props.form.drugAllergies, newAllergyInput, showAddAllergy)
const addCustomDisease = () => addCustomTag(availableDiseases.value, props.form.chronicDiseases, newDiseaseInput, showAddDisease)

const tagGroups = computed(() => [
    {
        label: 'ประวัติการแพ้ยา / สารเคมี',
        pool: availableAllergies,
        selected: props.form.drugAllergies,
        toggle: toggleAllergy,
        input: newAllergyInput,
        show: showAddAllergy,
        add: addCustomAllergy,
        placeholder: 'พิมพ์แพ้ยา...',
        activeClass: 'bg-rose-50 border-rose-200 text-rose-600'
    },
    {
        label: 'โรคประจำตัว / ภาวะสุขภาพ',
        pool: availableDiseases,
        selected: props.form.chronicDiseases,
        toggle: toggleDisease,
        input: newDiseaseInput,
        show: showAddDisease,
        add: addCustomDisease,
        placeholder: 'พิมพ์โรคประจำตัว...',
        activeClass: 'bg-indigo-50 border-indigo-200 text-indigo-600'
    }
])
</script>

<template>
    <div id="section-03" class="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-slate-200/40 relative animate-fade-in">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
            <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl font-black text-sm flex items-center justify-center shrink-0">03</div>
            <div>
                <h2 class="text-base md:text-lg font-black text-slate-800 tracking-tight">ข้อมูลความปลอดภัยและสุขภาพ</h2>
                <p class="text-xs font-semibold text-gray-400 mt-0.5">ประวัติแพ้ยา โรคประจำตัว สิ่งที่ทีมรักษาควรระมัดระวัง</p>
            </div>
        </div>

        <div class="space-y-6">
            <div v-for="tagGroup in tagGroups" :key="tagGroup.label">
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-2">
                    {{ tagGroup.label }}
                    <span v-if="isEditMode" class="text-indigo-500 font-bold"> (คลิกเพื่อเปิด/ปิด)</span>
                </label>
                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="tag in tagGroup.pool.value"
                        :key="tag"
                        type="button"
                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        :class="tagGroup.selected.includes(tag) ? tagGroup.activeClass : 'bg-white border-gray-200 text-slate-500 hover:bg-slate-50'"
                        :disabled="!isEditMode"
                        @click="tagGroup.toggle(tag)"
                    >
                        <UIcon v-if="tagGroup.selected.includes(tag)" name="i-lucide-check" class="w-3.5 h-3.5" />
                        <span>{{ tag }}</span>
                    </button>
                    <button
                        v-if="isEditMode && !tagGroup.show.value"
                        type="button"
                        class="text-xs md:text-sm px-3.5 py-2 rounded-full border border-gray-200 bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold flex items-center gap-1 cursor-pointer"
                        @click="tagGroup.show.value = true"
                    >
                        <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" /><span>เพิ่ม</span>
                    </button>
                    <div v-else-if="isEditMode" class="flex items-center gap-1 bg-white border border-indigo-200 rounded-full px-2 py-0.5 shadow-sm">
                        <input
                            v-model="tagGroup.input.value"
                            type="text"
                            :placeholder="tagGroup.placeholder"
                            class="bg-transparent text-xs md:text-sm font-semibold px-2 py-0.5 outline-none w-20 text-slate-700"
                            @keyup.enter="tagGroup.add()"
                        />
                        <button type="button" class="bg-indigo-600 text-white rounded-full p-1 flex items-center justify-center cursor-pointer" @click="tagGroup.add()">
                            <UIcon name="i-lucide-check" class="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <label class="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">หมายเหตุเพิ่มเติม / สิ่งที่ควรระวัง</label>
                <textarea
                    v-model="form.medicalNotes"
                    rows="3"
                    :readonly="!isEditMode"
                    placeholder="เช่น ประวัติเสริมจมูกมา, ชอบอุณหภูมิห้องค่อนข้างอุ่น..."
                    class="w-full bg-slate-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none resize-none transition-all"
                    :class="!isEditMode ? 'bg-slate-50/50 border-slate-100/60 text-slate-800' : ''"
                ></textarea>
            </div>
        </div>
    </div>
</template>
