const BRANCH_COLORS = {
    'เลย':           { pill: 'bg-emerald-500 text-white', dot: 'bg-emerald-500', text: 'text-emerald-600' },
    'เมืองทองธานี':  { pill: 'bg-indigo-600 text-white',  dot: 'bg-indigo-500',  text: 'text-indigo-600' },
    'อมตะชลบุรี':    { pill: 'bg-rose-500 text-white',    dot: 'bg-rose-500',    text: 'text-rose-600' }
} as const

const FALLBACK = { pill: 'bg-slate-500 text-white', dot: 'bg-slate-500', text: 'text-slate-600' }

export function useBranchColor() {
    const getBranchPillColor  = (branch: string) => (BRANCH_COLORS[branch as keyof typeof BRANCH_COLORS] ?? FALLBACK).pill
    const getBranchDotColor   = (branch: string) => (BRANCH_COLORS[branch as keyof typeof BRANCH_COLORS] ?? FALLBACK).dot
    const getBranchTextColor  = (branch: string) => (BRANCH_COLORS[branch as keyof typeof BRANCH_COLORS] ?? FALLBACK).text

    return { getBranchPillColor, getBranchDotColor, getBranchTextColor }
}
