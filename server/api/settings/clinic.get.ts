import { simulateDelay } from '../../utils/delay'

export default defineEventHandler(async () => {
    await simulateDelay(300)

    return {
        status: 'success',
        data: {
            brand: {
                logoUrl: '',
                nameEn: 'AVACLINIC',
                nameTh: 'เอวาคลินิก เวชกรรม',
                legalName: 'บริษัท เอวา คลินิก จำกัด',
                businessType: 'คลินิกเวชกรรม',
                primaryColor: 'violet',
                customColor: '#602809'
            },
            license: {
                taxId: '0105563984721',
                taxBranch: 'สำนักงานใหญ่',
                vatType: 'จดทะเบียน VAT 7%',
                licenseNumber: 'พ.ษ. 5501-25-123',
                licenseIssuedDate: '2025-01-12',
                licenseExpiryDate: '2027-01-11'
            },
            contact: {
                callCenter: '02-123-4567',
                lineOfficial: '@avaclinic',
                email: 'hello@avaclinic.co.th',
                website: 'avaclinic.co.th',
                facebook: 'facebook.com/avaclinic',
                instagram: '@avaclinic'
            },
            branches: [
                {
                    id: 1,
                    name: 'พระราม 9 (สำนักงานใหญ่)',
                    tag: 'สาขาหลัก',
                    address: '123 ถนนพระราม 9 แขวงบางกะปิ เขตห้วยขวาง กรุงเทพ 10310',
                    phone: '02-123-4567',
                    staffCount: 18,
                    isHQ: true,
                    isOpen: true
                },
                {
                    id: 2,
                    name: 'เลย',
                    tag: '',
                    address: '45 ถนนศรีสุริยา อ.เมือง จ.เลย 42000',
                    phone: '042-811-234',
                    staffCount: 8,
                    isHQ: false,
                    isOpen: true
                },
                {
                    id: 3,
                    name: 'มวกเหล็ก',
                    tag: '',
                    address: '88 ถนนมิตรภาพ ต.มวกเหล็ก จ.สระบุรี 18180',
                    phone: '036-341-567',
                    staffCount: 6,
                    isHQ: false,
                    isOpen: true
                },
                {
                    id: 4,
                    name: 'โคราช ซิตี้พลาซ่า',
                    tag: '',
                    address: '99 ถนนมิตรภาพ ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000',
                    phone: '044-211-890',
                    staffCount: 0,
                    isHQ: false,
                    isOpen: false
                }
            ],
            businessHours: [
                { day: 'จันทร์', dayShort: 'จ', open: true, start: '09:00', end: '20:00' },
                { day: 'อังคาร', dayShort: 'อ', open: true, start: '09:00', end: '20:00' },
                { day: 'พุธ', dayShort: 'พ', open: true, start: '09:00', end: '20:00' },
                { day: 'พฤหัสบดี', dayShort: 'พฤ', open: true, start: '09:00', end: '20:00' },
                { day: 'ศุกร์', dayShort: 'ศ', open: true, start: '09:00', end: '21:00' },
                { day: 'เสาร์', dayShort: 'ส', open: true, start: '10:00', end: '21:00' },
                { day: 'อาทิตย์', dayShort: 'อา', open: false, start: '09:00', end: '18:00' }
            ],
            services: [
                'Botox / Filler',
                'Laser Treatment',
                'PDO Thread',
                'IV Drip / Vitamin',
                'รักษาสิว',
                'Mesotherapy',
                'HIFU / Ulthera',
                'Dermatology'
            ]
        }
    }
})
