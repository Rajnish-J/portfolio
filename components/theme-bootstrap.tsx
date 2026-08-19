export function ThemeBootstrap() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var s=localStorage.getItem('theme');var d=s==='dark';if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
      }}
    />
  )
}
