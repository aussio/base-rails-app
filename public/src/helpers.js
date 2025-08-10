export function safeJson(res) {
    return res.text().then(text => {
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    });
  }