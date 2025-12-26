(async () => {
  try {
    const res = await fetch(
      'https://xwcpxwjxqllfwferproi.supabase.co/auth/v1/signup',
      {
        method: 'POST',
        headers: {
          apikey: 'sb_publishable_bLeViM_d-lpNXhd-huKK2g_qKPlcMKh',
          Authorization: 'Bearer sb_publishable_bLeViM_d-lpNXhd-huKK2g_qKPlcMKh',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'testai123@example.com', password: 'Testpass123!' }),
      }
    );

    console.log('status', res.status);
    const text = await res.text();
    try {
      console.log('body', JSON.parse(text));
    } catch (e) {
      console.log('body text', text);
    }
  } catch (err) {
    console.error('fetch error', err);
  }
})();
