import { Component, type ReactNode } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToastProvider } from './components/Toast';
import { AppStoreProvider } from './store/AppStore';
import { BibliographyPage } from './pages/BibliographyPage';
import { DataPage } from './pages/DataPage';
import { ExercisePage } from './pages/ExercisePage';
import { HomePage, WelcomePage } from './pages/HomePage';
import { JournalDetailPage, JournalEditorPage, JournalPage } from './pages/JournalPages';
import { LabPage } from './pages/LabPage';
import { LabsPage } from './pages/LabsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PlanPage } from './pages/PlanPage';
import { ProgressPage } from './pages/ProgressPage';
import { SafetyPage } from './pages/SafetyPage';
import { ScenarioPage } from './pages/ScenarioPage';
import { ScenariosPage } from './pages/ScenariosPage';
import { ToolPage } from './pages/ToolPage';

/** Intercetta errori di rendering imprevisti senza perdere i dati salvati. */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="container section read">
        <h1>Qualcosa non ha funzionato</h1>
        <p className="lead">Si è verificato un errore imprevisto nella pagina. I tuoi dati salvati sul dispositivo non sono stati toccati.</p>
        <div className="row">
          <button className="btn" onClick={() => (window.location.hash = '#/', window.location.reload())}>
            Torna all’inizio
          </button>
        </div>
        <p className="small muted" style={{ marginTop: 20 }}>
          Dettaglio tecnico: {this.state.error.message}
        </p>
      </div>
    );
  }
}

export function App() {
  return (
    <ErrorBoundary>
      <AppStoreProvider>
        <ToastProvider>
          <HashRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/benvenuto" element={<WelcomePage />} />
                <Route path="/laboratori" element={<LabsPage />} />
                <Route path="/laboratori/:labId" element={<LabPage />} />
                <Route path="/scenari" element={<ScenariosPage />} />
                <Route path="/scenari/:scenarioId" element={<ScenarioPage />} />
                <Route path="/esercizi/:exerciseId" element={<ExercisePage />} />
                <Route path="/strumenti/:toolId" element={<ToolPage />} />
                <Route path="/diario" element={<JournalPage />} />
                <Route path="/diario/nuovo" element={<JournalEditorPage />} />
                <Route path="/diario/:entryId" element={<JournalDetailPage />} />
                <Route path="/diario/:entryId/modifica" element={<JournalEditorPage />} />
                <Route path="/piano" element={<PlanPage />} />
                <Route path="/progressi" element={<ProgressPage />} />
                <Route path="/bibliografia" element={<BibliographyPage />} />
                <Route path="/dati" element={<DataPage />} />
                <Route path="/sicurezza" element={<SafetyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </HashRouter>
        </ToastProvider>
      </AppStoreProvider>
    </ErrorBoundary>
  );
}
