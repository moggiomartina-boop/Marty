import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/Layout';
import { useToast } from '../components/Toast';
import { Bar, ChipSelect, ConfirmDialog, Scale, SingleSelect } from '../components/ui';
import { exerciseById, exercisesByLab } from '../content/exercises';
import { labById } from '../content/labs';
import { useStore } from '../store/AppStore';
import type { AnswerValue, Exercise, ExerciseStep } from '../types';
import { formatDate } from '../utils/format';
import { NotFoundPage } from './NotFoundPage';
import { SafetyGate } from '../tools/Safety';

export function ExercisePage() {
  const { exerciseId = '' } = useParams();
  const ex = exerciseById(exerciseId);
  if (!ex) return <NotFoundPage message="Questo esercizio non esiste." />;
  const runner = <ExerciseRunner key={ex.id} ex={ex} />;
  return ex.gated ? <SafetyGate>{runner}</SafetyGate> : (
    runner
  );
}

const defaultValue = (s: ExerciseStep): AnswerValue => (s.type === 'chips' ? [] : s.type === 'scale' ? Math.round(((s.min ?? 0) + (s.max ?? 10)) / 2) : '');

const isAnswered = (s: ExerciseStep, v: AnswerValue | undefined) => {
  if (s.optional || s.type === 'info' || s.type === 'scale') return true;
  if (Array.isArray(v)) return v.length > 0;
  return typeof v === 'string' ? v.trim().length > 0 : v !== undefined;
};

function ExerciseRunner({ ex }: { ex: Exercise }) {
  const { data, dispatch } = useStore();
  const toast = useToast();
  const saved = data.progress.exercises[ex.id];
  const [mode, setMode] = useState<'run' | 'result'>(saved ? 'result' : 'run');
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(() => ({
    ...Object.fromEntries(ex.steps.map((s) => [s.id, defaultValue(s)])),
    ...(saved?.answers ?? {}),
  }));
  const [confirmReset, setConfirmReset] = useState(false);
  const lab = labById(ex.lab)!;
  const step = ex.steps[i];
  const last = i === ex.steps.length - 1;
  const canGo = isAnswered(step, answers[step.id]);
  const set = (v: AnswerValue) => setAnswers({ ...answers, [step.id]: v });
  const others = exercisesByLab(ex.lab).filter((e) => e.id !== ex.id);

  const finish = () => {
    dispatch({ type: 'completeExercise', id: ex.id, result: { answers, completedAt: new Date().toISOString() } });
    toast('Esercizio salvato');
    setMode('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`container accent-${lab.accent}`}>
      <nav className="breadcrumb" style={{ paddingTop: 24 }} aria-label="Percorso">
        <Link to={`/laboratori/${lab.id}?tab=esercizi`}>
          Laboratorio {lab.number} · {lab.title}
        </Link>{' '}
        / Esercizio
      </nav>
      <PageHead eyebrow={`Esercizio guidato · ${ex.duration}`} title={ex.title} lead={ex.intro} />

      <div className="read">
        {mode === 'run' && (
          <div className="scene">
            <div className="row" style={{ marginBottom: 20 }}>
              <span className="small muted">
                Passo {i + 1} di {ex.steps.length}
              </span>
              <Bar value={(i + 1) / ex.steps.length} label="Avanzamento esercizio" />
            </div>
            <div className="fade-in" key={step.id}>
              <div className="field">
                <label className="label" htmlFor={`st-${step.id}`} style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 500 }}>
                  {step.prompt}
                  {step.optional && <span className="muted small"> (facoltativo)</span>}
                </label>
                {step.help && <span className="help">{step.help}</span>}
                <StepInput step={step} value={answers[step.id]} onChange={set} />
              </div>
            </div>
            <div className="row" style={{ marginTop: 12 }}>
              <button className="btn btn-secondary" disabled={i === 0} onClick={() => setI(i - 1)}>
                <Icon name="arrowLeft" /> Indietro
              </button>
              <span className="spacer" />
              {last ? (
                <button className="btn" disabled={!canGo} onClick={finish}>
                  <Icon name="check" /> Completa
                </button>
              ) : (
                <button className="btn" disabled={!canGo} onClick={() => setI(i + 1)}>
                  Avanti <Icon name="arrowRight" />
                </button>
              )}
            </div>
            {!canGo && <p className="small muted" style={{ marginTop: 10 }}>Rispondi per proseguire.</p>}
          </div>
        )}

        {mode === 'result' && (
          <div className="fade-in">
            <div className="card card-quiet" style={{ marginBottom: 18 }}>
              <span className="eyebrow">Completato {saved ? `il ${formatDate(saved.completedAt)}` : ''}</span>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', margin: 0 }}>{ex.closing}</p>
            </div>
            <div className="card">
              <h3>Le tue risposte</h3>
              <dl className="entry-detail">
                {ex.steps.map((s) => {
                  const v = answers[s.id];
                  const txt = Array.isArray(v) ? v.join(', ') : String(v ?? '');
                  if (!txt.trim()) return null;
                  return (
                    <div key={s.id}>
                      <dt>{s.prompt}</dt>
                      <dd>{s.type === 'scale' ? `${txt} / ${s.max ?? 10}` : txt}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
            <div className="row" style={{ marginTop: 18 }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setI(0);
                  setMode('run');
                }}
              >
                <Icon name="edit" /> Modifica le risposte
              </button>
              <button className="btn btn-danger" onClick={() => setConfirmReset(true)}>
                <Icon name="refresh" /> Ricomincia da zero
              </button>
              <span className="spacer" />
              <Link to="/piano" className="btn">
                Porta nel piano <Icon name="arrowRight" />
              </Link>
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div style={{ marginTop: 36 }}>
            <h3>Altri esercizi di questo laboratorio</h3>
            <div className="grid grid-2">
              {others.map((o) => (
                <Link key={o.id} to={`/esercizi/${o.id}`} className="card card-link">
                  <span className="tag">{o.duration}</span>
                  <h3 style={{ marginTop: 8 }}>{o.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Ricominciare l’esercizio?"
        confirmLabel="Cancella e ricomincia"
        danger
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          dispatch({ type: 'resetExercise', id: ex.id });
          setAnswers(Object.fromEntries(ex.steps.map((s) => [s.id, defaultValue(s)])));
          setI(0);
          setMode('run');
          setConfirmReset(false);
        }}
      >
        Le risposte salvate per questo esercizio verranno eliminate.
      </ConfirmDialog>
    </div>
  );
}

function StepInput({ step, value, onChange }: { step: ExerciseStep; value: AnswerValue | undefined; onChange: (v: AnswerValue) => void }) {
  switch (step.type) {
    case 'text':
      return <input id={`st-${step.id}`} className="input" value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} />;
    case 'textarea':
      return <textarea id={`st-${step.id}`} className="textarea" value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} />;
    case 'chips':
      return <ChipSelect options={step.options ?? []} value={Array.isArray(value) ? value : []} onChange={onChange} label={step.prompt} />;
    case 'single':
      return <SingleSelect options={step.options ?? []} value={String(value ?? '')} onChange={onChange} label={step.prompt} />;
    case 'scale':
      return (
        <Scale
          value={typeof value === 'number' ? value : 5}
          onChange={onChange}
          min={step.min}
          max={step.max}
          minLabel={step.minLabel}
          maxLabel={step.maxLabel}
          label={step.prompt}
        />
      );
    case 'info':
      return null;
  }
}
