import React, { useEffect } from 'react';

export default function CompareCapacity({ }) {

  const [width, setWidth] = React.useState(window.innerWidth);
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    let divElement = document.getElementById('viz1587119149621');
    let vizElement = divElement.getElementsByTagName('object')[0];
    if (divElement.offsetWidth > 800) {

      vizElement.style.width = '100%';
      vizElement.style.maxWidth = '100%';
      vizElement.style.minHeight = '850px';
      vizElement.style.maxHeight = (divElement.offsetWidth * 0.75) + 'px';
    } else if (divElement.offsetWidth < 800) {

      vizElement.style.width = '100%';
      vizElement.style.maxWidth = '100%';
      vizElement.style.minHeight = '600px';
      vizElement.style.maxHeight = (divElement.offsetWidth * 0.75) + 'px';
    } else {

      vizElement.style.width = '100%';
      vizElement.style.minHeight = '1700px';
      vizElement.style.maxHeight = (divElement.offsetWidth * 1.77) + 'px';
    }
    let scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);

    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, [])
  let renderDivs = ()=>{
    if(width < 800){
      return <param name='device' value='phone' />
    }
  }
  return (
    <>
      <div className='tableauPlaceholder' id='viz1587119149621' style={{ position: 'relative' }}>
        <noscript>
          <a href='#'>
            <img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Da&#47;Dashboard_Kuwait_age_groups&#47;Simulations-onlyinfectiousbydistrict&#47;1_rss.png' style={{ border: 'none' }} />
          </a>
        </noscript>
        <object className='tableauViz' style={{ display: 'none' }}>
          <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
          <param name='embed_code_version' value='3' />
          <param name='site_root' value='' />
          <param name='name' value='Dashboard_Kuwait_age_groups&#47;Simulations-onlyinfectiousbydistrict' />
          <param name='tabs' value='no' />
          <param name='toolbar' value='no' />
          <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Da&#47;Dashboard_Kuwait_age_groups&#47;Simulations-onlyinfectiousbydistrict&#47;1.png' />
          <param name='animate_transition' value='yes' />
          <param name='display_static_image' value='yes' />
          {renderDivs()}
          <param name='display_spinner' value='yes' />
          <param name='display_overlay' value='yes' />
          <param name='display_count' value='yes' />
        </object>
      </div>
    </>
  )
}
