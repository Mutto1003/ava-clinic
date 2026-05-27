<template>
    <div class="min-h-screen bg-slate-50">
        <LayoutSidebar />
        <LayoutHeaderBar />
        <main class="ml-[255px] pt-16 min-h-screen overflow-y-auto">
            <slot />
        </main>
    </div>
</template>
