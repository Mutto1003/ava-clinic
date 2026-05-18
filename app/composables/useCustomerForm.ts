import { reactive, computed } from 'vue'

export interface CustomerForm {
    id: string
    hn: string
    title: string
    firstName: string
    lastName: string
    nickname: string
    gender: string
    birthDate: string
    idCard: string

    address: string
    province: string
    district: string
    subDistrict: string
    zipcode: string

    mobile: string
    homePhone: string
    email: string
    lineId: string
    emergencyName: string
    emergencyRelation: string
    emergencyMobile: string

    leadSource: string
    referredBy: string
    customerGroup: string

    drugAllergies: string[]
    chronicDiseases: string[]
    medicalNotes: string

    pdpaConsent: boolean
    linePromoConsent: boolean
    smsNoticeConsent: boolean
    avatarColor: string
}

export function useCustomerForm() {
    const form = reactive<CustomerForm>({
        id: '',
        hn: '',
        title: 'นาย',
        firstName: '',
        lastName: '',
        nickname: '',
        gender: 'ชาย',
        birthDate: '',
        idCard: '',

        address: '',
        province: '',
        district: '',
        subDistrict: '',
        zipcode: '',

        mobile: '',
        homePhone: '',
        email: '',
        lineId: '',
        emergencyName: '',
        emergencyRelation: '— เลือก —',
        emergencyMobile: '',

        leadSource: 'Facebook / Instagram',
        referredBy: '— ไม่ระบุ —',
        customerGroup: 'Standard',

        drugAllergies: [],
        chronicDiseases: [],
        medicalNotes: '',

        pdpaConsent: false,
        linePromoConsent: false,
        smsNoticeConsent: false,
        avatarColor: 'bg-indigo-100 text-indigo-600'
    })

    const avatarInitials = computed(() => {
        if (form.firstName && form.lastName) {
            return (form.firstName.charAt(0) + form.lastName.charAt(0)).toUpperCase()
        }
        if (form.firstName) return form.firstName.charAt(0).toUpperCase()
        return 'HN'
    })

    const computedAge = computed(() => {
        if (!form.birthDate) return null
        const today = new Date()
        const birth = new Date(form.birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--
        return age >= 0 ? age : 0
    })

    const isIdCardValid = computed(() => {
        if (!form.idCard) return false
        const digits = form.idCard.replace(/-/g, '')
        if (digits.length !== 13) return false
        let sum = 0
        for (let i = 0; i < 12; i++) sum += Number(digits[i]) * (13 - i)
        return (11 - (sum % 11)) % 10 === Number(digits[12])
    })

    const isMobileValid = computed(() => {
        if (!form.mobile) return false
        const clean = form.mobile.replace(/-/g, '')
        return clean.length === 10 && clean.startsWith('0')
    })

    const populateForm = (data: Partial<CustomerForm>) => {
        Object.assign(form, {
            id: data.id ?? '',
            hn: data.hn ?? '',
            title: data.title ?? 'นาย',
            firstName: data.firstName ?? '',
            lastName: data.lastName ?? '',
            nickname: data.nickname ?? '',
            gender: data.gender ?? 'ชาย',
            birthDate: data.birthDate ?? '',
            idCard: data.idCard ?? '',
            address: data.address ?? '',
            province: data.province ?? '',
            district: data.district ?? '',
            subDistrict: data.subDistrict ?? '',
            zipcode: data.zipcode ?? '',
            mobile: data.mobile ?? '',
            homePhone: data.homePhone ?? '',
            email: data.email ?? '',
            lineId: data.lineId ?? '',
            emergencyName: data.emergencyName ?? '',
            emergencyRelation: data.emergencyRelation ?? '— เลือก —',
            emergencyMobile: data.emergencyMobile ?? '',
            leadSource: data.leadSource ?? 'Facebook / Instagram',
            referredBy: data.referredBy ?? '— ไม่ระบุ —',
            customerGroup: data.customerGroup ?? 'Standard',
            drugAllergies: data.drugAllergies ? [...data.drugAllergies] : [],
            chronicDiseases: data.chronicDiseases ? [...data.chronicDiseases] : [],
            medicalNotes: data.medicalNotes ?? '',
            pdpaConsent: !!data.pdpaConsent,
            linePromoConsent: !!data.linePromoConsent,
            smsNoticeConsent: !!data.smsNoticeConsent,
            avatarColor: data.avatarColor ?? 'bg-indigo-100 text-indigo-600'
        })
    }

    return { form, avatarInitials, computedAge, isIdCardValid, isMobileValid, populateForm }
}
