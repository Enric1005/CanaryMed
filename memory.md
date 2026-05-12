### [2026-05-12] ERROR
- **Context**: El proyecto CanaryMed2 no compilaba por múltiples errores críticos
- **Lección**: Se corrigieron 14 issues de configuración y código. Ver detalles abajo.

### [2026-05-12] DECISION
- **Context**: MiApp/ contenía una plantilla Ionic starter duplicada (Angular 20) que no tenía diferencias relevantes vs el proyecto principal (Angular 21 con SSR)
- **Lección**: Se eliminó miApp/ por completo.

### [2026-05-12] ERROR
- **Context**: environment.ts inicializaba Firebase al nivel del módulo (initializeApp + getFirestore) mezclando dos instancias de Firestore
- **Lección**: Se movió a provideFirebaseApp en app.config.ts con archivos separados para dev/prod

### [2026-05-12] ACUERDO
- **Context**: Las credenciales de Firebase en environment.ts y environment.prod.ts
- **Lección**: Quedan como placeholders (YOUR_API_KEY, etc.). Se reemplazarán cuando el proyecto Firebase esté configurado.
