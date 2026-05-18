<script setup lang="ts">
definePageMeta({
    layout: 'main',
    middleware: ['auth']
})

const { form, avatarInitials, computedAge, isIdCardValid, isMobileValid } = useCustomerForm()
const toast = useAppToast()

const isLoading = ref(false)
const activeTab = ref(1)

const STEPS = [
    { label: 'ข้อมูลพื้นฐาน' },
    { label: 'การติดต่อ' },
    { label: 'ข้อมูลสุขภาพ' },
    { label: 'การยินยอม' }
]

const progressList = computed(() => [
    { label: 'ข้อมูลพื้นฐานครบถ้วน', done: !!(form.title && form.firstName && form.lastName && form.gender && form.birthDate && form.idCard) },
    { label: 'การติดต่อระบุเรียบร้อย', done: !!(form.mobile && form.address) },
    { label: 'ยอมรับเงื่อนไข & PDPA', done: form.pdpaConsent }
])

const completionProgress = computed(() => {
    const done = progressList.value.filter(i => i.done).length
    return Math.round((done / progressList.value.length) * 100)
})

const scrollToSection = (id: string, tabNum: number) => {
    activeTab.value = tabNum
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const simulateIdScan = () => {
    toast.info('ระบบสแกน', 'กำลังเชื่อมต่อเครื่องอ่านบัตรประชาชน...')
    setTimeout(() => {
        Object.assign(form, {
            title: 'นางสาว', firstName: 'พิมลภา', lastName: 'จันทร์เพ็ญ', nickname: 'จอย',
            gender: 'หญิง', birthDate: '1990-05-12', idCard: '1100201456789',
            address: '99/1 ถนนสุขุมวิท', province: 'กรุงเทพมหานคร', district: 'คลองเตย',
            subDistrict: 'คลองเตย', zipcode: '10110', mobile: '081-234-5678',
            email: 'pimonpa.j@gmail.com', lineId: '@pimonpa',
            emergencyName: 'สมเกียรติ จันทร์เพ็ญ (บิดา)', emergencyMobile: '089-876-5432',
            drugAllergies: ['Penicillin'], chronicDiseases: ['ผิวแพ้ง่าย'],
            pdpaConsent: true, linePromoConsent: true, smsNoticeConsent: true
        })
        toast.success('สแกนสำเร็จ', 'ดึงข้อมูลจากบัตรประชาชน พิมลภา จันทร์เพ็ญ เรียบร้อยแล้ว')
    }, 1200)
}

const saveCustomer = async () => {
    if (!form.firstName || !form.lastName) {
        toast.error('ข้อมูลไม่ครบถ้วน', 'กรุณากรอกชื่อและนามสกุลลูกค้า')
        return
    }
    if (isLoading.value) return
    isLoading.value = true
    try {
        await $fetch('/api/customers', { method: 'POST', body: form })
        toast.success('สำเร็จ', 'บันทึกลูกค้าใหม่เรียบร้อยแล้ว')
        setTimeout(() => navigateTo('/customerInfo'), 800)
    } catch {
        isLoading.value = false
        toast.error('ข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้')
    }
}
</script>

<template>
    <div class="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
        <CustomerNewPageHeader
            @scan="simulateIdScan"
            @cancel="navigateTo('/dashboard')"
        />

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Left: Form -->
            <div class="lg:col-span-8 space-y-6">
                <!-- Stepper -->
                <div class="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center justify-between gap-4">
                    <CommonStepperNav
                        :active-tab="activeTab"
                        :steps="STEPS"
                        @select="(n) => scrollToSection('section-0' + n, n)"
                    />
                    <div class="text-right hidden sm:block shrink-0">
                        <span class="text-xs font-black text-slate-400 block">กรอกเสร็จสิ้น</span>
                        <span class="text-sm font-black text-slate-700 mt-0.5 block">{{ completionProgress }}%</span>
                    </div>
                </div>

                <div class="space-y-6">
                    <CustomerNewTabGeneral
                        :form="form"
                        :avatar-initials="avatarInitials"
                        :computed-age="computedAge"
                        :is-id-card-valid="isIdCardValid"
                    />
                    <CustomerNewTabContact :form="form" :is-mobile-valid="isMobileValid" />
                    <CustomerNewTabHealth :form="form" />
                    <CustomerNewTabAdditional :form="form" />
                </div>

                <CustomerNewSaveFooter
                    :is-loading="isLoading"
                    @cancel="navigateTo('/dashboard')"
                    @save="saveCustomer"
                />
            </div>

            <!-- Right: Preview + Progress -->
            <div class="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                <CustomerNewLivePreview
                    :form="form"
                    :avatar-initials="avatarInitials"
                    :computed-age="computedAge"
                />
                <CustomerNewCompletionScore
                    :progress-list="progressList"
                    :completion-progress="completionProgress"
                />
            </div>
        </div>
    </div>
</template>
