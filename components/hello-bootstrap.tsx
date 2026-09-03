/* Decides, before first paint, whether the `hello` overlay plays. Mirrors ThemeBootstrap: a
   blocking inline script, because a React effect would run a frame too late and flash the page.
   The scroll-lock release is a plain setTimeout rather than a React cleanup so the page becomes
   usable on schedule even if the app never hydrates. */
export function HelloBootstrap() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){var e=document.documentElement;try{if(sessionStorage.getItem('hello')||matchMedia('(prefers-reduced-motion: reduce)').matches){e.classList.add('hello-skip');return}sessionStorage.setItem('hello','1')}catch(r){e.classList.add('hello-skip');return}e.classList.add('hello-playing');setTimeout(function(){e.classList.remove('hello-playing')},4600)})()`,
      }}
    />
  )
}
