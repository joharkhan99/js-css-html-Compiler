// button hover
$('.toggleButton').hover(function () {
  $(this).addClass('highlightedButton');
}, function () {
  $(this).removeClass('highlightedButton');
});

// when user clicks buttons
$('.toggleButton').click(function () {
  $(this).toggleClass('active');
  $(this).removeClass('highlightedButton');
  var panelId = $(this).attr('id') + "Panel";

  // show or hide panels
  $('#' + panelId).toggleClass('hidden');
  var numberOfActivePanels = 4 - $('.hidden').length;
  $('.panel').width(($(window).width() / numberOfActivePanels) - 20);
});

// panels
$('.panel').height($(window).height() - $('#header').height() - 20);
$('.panel').width(($(window).width() / 2) - 20);

// when user comes first then load
updateContent();
// change content/output everytime user adds/change something
$('textarea').on('change keyup paste', function () {
  updateContent();
});

$('.save').click(e => {
  e.preventDefault();
  storeToLS();
})


function updateContent() {
  // changing iframe content
  // find html element inside iframe and replace it with new html/content
  // apply css also
  var newContent = `
  <!doctype html>
    <html>
      <head>
        <style type='text/css'>
          ${$('#cssPanel').val()}
        </style>
      </head>
      <body>
        ${$('#htmlPanel').val()}
      </body>
    </html>
    `;

  $('iframe').contents().find('html').html(newContent);

  // now apply javascript
  var js = $('#javascriptPanel').val();
  document.getElementById('outputPanel').contentWindow.eval(js);
}

function storeToLS() {
  var htmlCont = $('#htmlPanel').val();
  localStorage.setItem('html', htmlCont);

  var js = $('#javascriptPanel').val();
  localStorage.setItem('js', js);

  var css = $('#cssPanel').val();
  localStorage.setItem('css', css);
  return true;
}

function getStoredContent() {
  if (localStorage.getItem('html') != null)
    $('#htmlPanel').val(localStorage.getItem('html'));
  if (localStorage.getItem('css') != null)
    $('#cssPanel').val(localStorage.getItem('css'));
  if (localStorage.getItem('js') != null)
    $('#javascriptPanel').val(localStorage.getItem('js'));

  var newContent = `
  <!doctype html>
    <html>
      <head>
        <style type='text/css'>
          ${localStorage.getItem('css')}
        </style>
      </head>
      <body>
        ${localStorage.getItem('html')}
      </body>
    </html>
    `;

  if (localStorage.getItem('html') != null || localStorage.getItem('css') != null || localStorage.getItem('css') != null)
    $('iframe').contents().find('html').html(newContent);

  document.getElementById('outputPanel').contentWindow.eval(localStorage.getItem('js'));
}

$('.prev').click(e => {
  e.preventDefault();
  getStoredContent();
})
