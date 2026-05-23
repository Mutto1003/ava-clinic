<script setup lang="ts">
    import type { MemberFormData, ActivityItem, TeamRole } from '~/client/settings'

    defineProps<{
        form: MemberFormData
        recentActivity: ActivityItem[]
    }>()

    const permissionSummary: Record<TeamRole, { can: string[], partial: string[], cannot: string[] }> = {
        'หมอ': {
            can: ['เวชระเบียน · รูปก่อน-หลัง · นัดหมาย · Teleconsult · จดบันทึก SOAP · สั่งการรักษา'],
            partial: ['รายงานยอดขายของตัวเอง · ใบเสร็จเฉพาะเคสตนเอง · stock ที่ใช้ในเคส'],
            cannot: ['ราคาทุนสินค้า · รายงานรายได้ทั้งคลินิก · ตั้งค่าระบบ · เพิ่ม/ลบ user · ข้อมูลพนักงานคนอื่น']
        },
        'พนักงาน': {
            can: ['นัดหมาย · คิวเคาน์เตอร์ · ใบเสร็จ · อัปโหลดรูป · รายงานยอดขายสาขา'],
            partial: ['เวชระเบียน (ดูได้ ลบไม่ได้) · รูปก่อน-หลัง (อัปโหลดได้ ลบไม่ได้)'],
            cannot: ['ราคาทุนสินค้า · รายงานรายได้ทั้งคลินิก · ตั้งค่าระบบ · Teleconsult']
        },
        'Super Admin': {
            can: ['ทุกโมดูลในระบบ · ตั้งค่า user · รายงานรายได้ · ตั้งราคา · ผูก LINE OA · Audit log'],
            partial: [],
            cannot: []
        }
    }
</script>

<template>
    <div class="flex flex-col gap-5">
        <!-- Email Preview Card -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-black text-gray-900 text-sm">คำเชิญที่จะถูกส่ง</h3>
                <div class="flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                </div>
            </div>

            <!-- Email routing -->
            <div class="bg-slate-50 rounded-xl p-3 mb-4 text-[10px] font-medium text-gray-500 space-y-1">
                <div class="flex items-center justify-between">
                    <span class="font-bold text-gray-700">noreply@avaclinic.co.th →</span>
                    <span>{{ form.email || 'ยังไม่ได้กรอกอีเมล' }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span />
                    <span class="text-gray-400">{{ form.sendInviteEmail ? 'เมื่อกด บันทึก' : 'ปิดการส่งอีเมล' }}</span>
                </div>
            </div>

            <!-- Email template preview -->
            <div class="border border-gray-100 rounded-xl p-4 space-y-3">
                <!-- Clinic avatar -->
                <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center">
                    A
                </div>

                <div>
                    <p class="font-black text-gray-900 text-sm leading-snug">คุณได้รับเชิญเข้าทีม AVACLINIC</p>
                    <p class="text-[11px] text-gray-500 mt-2 leading-relaxed">
                        <template v-if="form.firstName || form.email">
                            เชิญคุณเข้าใช้งานในฐานะ:
                            <span class="font-black text-indigo-600">{{ form.role }} ({{ form.role === 'หมอ' ? 'Doctor' : form.role === 'พนักงาน' ? 'Staff' : 'Super Admin' }})</span>
                        </template>
                        <template v-else>
                            กรอกข้อมูลเพื่อดูตัวอย่างคำเชิญ
                        </template>
                    </p>
                    <p
                        v-if="form.branches.length"
                        class="text-[11px] text-gray-500 mt-1"
                    >
                        เข้าถึงสาขา: <span class="font-bold text-gray-700">{{ form.branches.join(', ') }}</span>
                    </p>
                </div>

                <!-- CTA button mock -->
                <div class="bg-indigo-600 text-white text-[11px] font-bold rounded-lg px-4 py-2 text-center">
                    ตั้งรหัสผ่าน & เข้าใช้งาน →
                </div>

                <p class="text-[10px] text-gray-400 leading-relaxed">
                    สิ้นหมดอายุใน 7 วัน
                    <template v-if="form.require2FA"> · เมื่อตั้งรหัสผ่านแล้ว ระบบจะขอให้ตั้ง 2FA ก่อนใช้งานครั้งแรก</template>
                </p>
            </div>
        </div>

        <!-- Permission Summary -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 class="font-black text-gray-900 text-sm mb-3">สรุปสิ่งที่ ROLE นี้เห็นได้</h3>

            <div class="flex items-center gap-2 mb-4">
                <span class="text-[10px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                    {{ form.role }}
                </span>
                <span class="text-[11px] text-gray-400 font-medium">เริ่มต้นมาจาก template</span>
            </div>

            <div class="space-y-3">
                <!-- Can do -->
                <div v-if="permissionSummary[form.role].can.length">
                    <div class="flex items-center gap-1.5 mb-1.5">
                        <UIcon
                            name="i-lucide-check-circle"
                            class="w-3.5 h-3.5 text-emerald-500"
                        />
                        <span class="text-[11px] font-black text-gray-700">เห็น · ทำได้</span>
                    </div>
                    <p class="text-[10px] text-gray-500 font-medium leading-relaxed pl-5">
                        {{ permissionSummary[form.role].can.join(' · ') }}
                    </p>
                </div>

                <!-- Partial -->
                <div v-if="permissionSummary[form.role].partial.length">
                    <div class="flex items-center gap-1.5 mb-1.5">
                        <UIcon
                            name="i-lucide-circle-dot"
                            class="w-3.5 h-3.5 text-amber-500"
                        />
                        <span class="text-[11px] font-black text-gray-700">เห็นบางส่วน</span>
                    </div>
                    <p class="text-[10px] text-gray-500 font-medium leading-relaxed pl-5">
                        {{ permissionSummary[form.role].partial.join(' · ') }}
                    </p>
                </div>

                <!-- Cannot -->
                <div v-if="permissionSummary[form.role].cannot.length">
                    <div class="flex items-center gap-1.5 mb-1.5">
                        <UIcon
                            name="i-lucide-x-circle"
                            class="w-3.5 h-3.5 text-red-400"
                        />
                        <span class="text-[11px] font-black text-gray-700">เห็นไม่ได้</span>
                    </div>
                    <p class="text-[10px] text-gray-500 font-medium leading-relaxed pl-5">
                        {{ permissionSummary[form.role].cannot.join(' · ') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Activity log -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-black text-gray-900 text-sm">ACTIVITY ล่าสุด</h3>
                <button class="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">ทั้งหมด →</button>
            </div>
            <div class="space-y-3">
                <div
                    v-for="item in recentActivity"
                    :key="item.id"
                    class="flex items-start gap-2.5"
                >
                    <div
                        class="w-2 h-2 rounded-full mt-1.5 shrink-0"
                        :class="item.color"
                    />
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center justify-between gap-2">
                            <p class="text-[11px] font-bold text-gray-800 truncate">
                                {{ item.actor }} {{ item.action }}
                            </p>
                            <span class="text-[10px] text-gray-400 font-medium shrink-0">{{ item.time }}</span>
                        </div>
                        <p class="text-[10px] text-gray-400 font-medium mt-0.5">{{ item.detail }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
