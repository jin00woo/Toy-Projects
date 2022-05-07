function initMap() {
  const loc = {lat:37.566536, lng:126.977966};
  const map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 14,
    center: loc
  });
  const marker = new google.maps.Marker({position: loc, map:map});
}

window.addEventListener('scroll', function(){
  if (window.scrollY > 150){ document.querySelector('#navbar').style.opacity = 0.9;
  }
  else{ document.querySelector('#navbar').style.opacity = 1;
  }
});

$('#navbar a, .btn').on('click', function(event){
  if(this.hash !== ''){
    event.preventDefault();
    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 100
      },
      800
    );
  }
});