<script setup lang="ts">
definePageMeta({
    layout: 'main',
    middleware: ['auth']
})

const route = useRoute()
const id = route.params.id
const toast = useAppToast()

const isLoading = ref(false)
const isEditMode = ref(false)
const activeTab = ref(1)

const { form, avatarInitials, computedAge, isIdCardValid, populateForm } = useCustomerForm()

const { data: response, pending, refresh } = await useFetch<any>(`/api/customers/${id}`)
const customerData = computed<any>(() => response.value?.data || {})

watch(customerData, () => {
    if (customerData.value?.firstName) populateForm(customerData.value)
}, { immediate: true })

const STEPS = [
    { label: 'ข้อมูลพื้นฐาน' },
    { label: 'การติดต่อ' },
    { label: 'ข้อมูลสุขภาพ' },
    { label: 'การยินยอม' }
]

const scrollToSection = (sectionId: string, tabNum: number) => {
    activeTab.value = tabNum
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const enterEditMode = () => {
    isEditMode.value = true
    toast.info('โหมดแก้ไข', 'กำลังเข้าสู่โหมดแก้ไขข้อมูลลูกค้า...')
}

const cancelEdit = () => {
    isEditMode.value = false
    populateForm(customerData.value)
    toast.warning('ยกเลิกการแก้ไข', 'คืนค่าข้อมูลล่าสุดเรียบร้อยแล้ว')
}

const saveChanges = async () => {
    if (!form.firstName || !form.lastName) {
        toast.error('ข้อมูลไม่ครบถ้วน', 'กรุณากรอกชื่อและนามสกุลลูกค้า')
        return
    }
    isLoading.value = true
    try {
        await $fetch(`/api/customers/${id}`, { method: 'PUT', body: form })
        isEditMode.value = false
        toast.success('บันทึกสำเร็จ', 'อัปเดตข้อมูลประวัติคนไข้เรียบร้อยแล้ว')
        refresh()
    } catch {
        toast.error('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลการเปลี่ยนแปลงได้')
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-6 pb-8">
        <CustomerInfoDetailHeader
            :form="form"
            :is-edit-mode="isEditMode"
            @edit="enterEditMode"
            @back="navigateTo('/customerInfo')"
        />

        <!-- Loading -->
        <div v-if="pending && !form.firstName" class="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p class="text-slate-500 font-semibold text-sm">กำลังโหลดข้อมูลประวัติลูกค้า...</p>
        </div>

        <!-- Main Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Left: Form -->
            <div class="lg:col-span-8 space-y-6">
                <!-- Stepper -->
                <div class="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                    <CommonStepperNav
                        :active-tab="activeTab"
                        :steps="STEPS"
                        @select="(n) => scrollToSection('section-0' + n, n)"
                    />
                    <div class="text-right hidden sm:block shrink-0 px-2">
                        <span class="text-xs font-black text-slate-400 block">สถานะเวชระเบียน</span>
                        <span class="text-sm font-black text-emerald-500 mt-0.5 block flex items-center gap-1 justify-end">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                            สมบูรณ์
                        </span>
                    </div>
                </div>

                <div class="space-y-6">
                    <CustomerInfoSectionBasic :form="form" :is-edit-mode="isEditMode" :computed-age="computedAge" :is-id-card-valid="isIdCardValid" />
                    <CustomerInfoSectionContact :form="form" :is-edit-mode="isEditMode" />
                    <CustomerInfoSectionHealth :form="form" :is-edit-mode="isEditMode" />
                    <CustomerInfoSectionConsent :form="form" :is-edit-mode="isEditMode" />
                </div>

                <CustomerInfoEditFooter
                    v-if="isEditMode"
                    :is-loading="isLoading"
                    @cancel="cancelEdit"
                    @save="saveChanges"
                />
            </div>

            <!-- Right: Patient Summary -->
            <div class="lg:col-span-4 lg:sticky lg:top-24">
                <CustomerInfoPatientSideCard
                    :form="form"
                    :avatar-initials="avatarInitials"
                    :computed-age="computedAge"
                />
            </div>
        </div>
    </div>
</template>
