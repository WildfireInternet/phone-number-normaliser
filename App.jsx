import { h } from 'preact';
import { signal } from '@preact/signals';

function normalizeUKPhone(number) {
  let num = number.replace(/[^\d+]/g, '');
  if (num.startsWith('0')) {
    num = '+44' + num.slice(1);
  }
  else if (num.startsWith('44')) {
    num = '+44' + num.slice(2);
  }
  else if (num.startsWith('+44')) {
    // do nothing
  }
  else if (num.startsWith('+')) {
    // do nothing
  }
  else {
    num = '+44' + num;
  }
  return num;
}

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
    const normalized = lines.map(normalizeUKPhone);
    output.value = normalized.join('\n');
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 30 }}>
      <h2>UK Phone Number Normalizer</h2>
      <label>
        <div>Paste phone numbers (one per line):</div>
        <textarea
          rows={10}
          style={{ width: '100%', marginBottom: 12 }}
          value={input.value}
          onInput={e => (input.value = e.target.value)}
          placeholder={"e.g.\n07123456789\n+447987654321\n02071234567"}
        />
      </label>
      <button onClick={handleNormalize} style={{ marginBottom: 12 }}>
        Normalize
      </button>
      <label>
        <div>Normalized numbers:</div>
        <textarea
          rows={10}
          style={{ width: '100%' }}
          value={output.value}
          readOnly
          placeholder="Normalized numbers will appear here"
        />
      </label>
      <button onClick={downloadTxt} style={{ marginTop: 12 }}>
        Download as .txt
      </button>
    </div>
  );
}