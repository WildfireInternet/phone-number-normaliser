import { h } from 'preact';
import { signal } from '@preact/signals';
import { normalizeUKPhone } from './lib/normalize-uk-phone.js';

const input = signal('');
const output = signal('');

function downloadTxt() {
  const blob = new Blob([output.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "normalized.txt";
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  function handleNormalize() {
    const lines = input.value.split('\n').map(line => line.trim()).filter(Boolean);
    const normalized = lines.map(normalizeUKPhone).filter(Boolean);
    output.value = normalized.join('\n');
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">UK Phone Number Normalizer</h1>

        <div className="form-section">
          <label className="label">
            Paste phone numbers (one per line):
          </label>
          <textarea
            className="textarea"
            rows={10}
            value={input.value}
            onInput={e => (input.value = e.target.value)}
            placeholder={"e.g.\n07123456789\n+447987654321\n02071234567"}
          />
        </div>

        <div className="form-section">
          <label className="label">
            Normalized numbers:
          </label>
          <textarea
            className="textarea textarea--readonly"
            rows={10}
            value={output.value}
            readOnly
            placeholder="Normalized numbers will appear here..."
          />
        </div>

        <div className="button-container">
          <button
            className="button button--primary"
            onClick={handleNormalize}
          >
            📱 Normalize Numbers
          </button>

          <button
            className="button button--secondary"
            onClick={downloadTxt}
          >
            💾 Download as .txt
          </button>
        </div>
      </div>
    </div>
  );
}