import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        { path: '/pacientes', name: 'Pacientes', component: () => import('@/views/Paciente/ListPacientes.vue') },
        { path: '/crear-paciente', name: 'CrearPaciente', component: () => import('@/components/Paciente/CrearPaciente.vue') },

        {
            path: '/pacientes/:pacienteId/atenciones',
            name: 'Atenciones',
            component: () => import('@/views/Atencion/ListAtenciones.vue'),
            props: true
        },
        {
            path: '/historia-clinica/:id',
            name: 'HistoriaClinica',
            component: () => import('@/components/HistoriaClinica/FormularioHistoriaClinicas.vue')
        },
        {
            path: '/historia-clinica/:id/modificar',
            name: 'ModificarHistoriaClinica',
            component: () => import('@/components/HistoriaClinica/ModificarHistoriaClinica.vue')
        },
        MainRoutes,
        AuthRoutes
    ]
});

router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/auth/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth: any = useAuthStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (authRequired && !auth.user) {
            auth.returnUrl = to.fullPath;
            return next('/auth/login');
        } else next();
    } else {
        next();
    }
});
