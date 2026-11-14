/**
 * Pacchetto regalo animato (CSS). Stati: "idle" | "shaking" | "open".
 * Il coperchio con il fiocco vola via all'apertura, dietro si accende la luce.
 */
export default function GiftBox({ state = 'idle' }) {
  return (
    <div className={`gift gift--${state}`} aria-hidden="true">
      <div className="gift-rays" />
      <div className="gift-lid">
        <div className="gift-bow">
          <span className="loop loop--l" />
          <span className="loop loop--r" />
          <span className="knot" />
        </div>
        <span className="ribbon-v" />
      </div>
      <div className="gift-body">
        <span className="ribbon-v" />
        <span className="ribbon-h" />
        <span className="tag">Per te</span>
      </div>
    </div>
  );
}
