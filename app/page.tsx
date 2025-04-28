export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Welcome to Your Story</h1>
      <a href="/onboarding" style={{ 
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: 'blue',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Go to Onboarding
      </a>
    </div>
  );
}
