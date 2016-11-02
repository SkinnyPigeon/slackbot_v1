var ImageGrabber = function( url ) {
  this.url = url;
  this.pictures = [];
}

ImageGrabber.prototype = {

  display: function() {
    var pictureSpace = document.getElementById( 'picture-space' );
    var list = document.createElement( 'ul' );
    pictureSpace.appendChild( list );
    for( var i = 0; i < this.pictures.length; i++ ) {
      var picture = document.createElement( 'li' );
      var text = this.pictures[i].name + " - " + this.pictures[i];
      picture.innerText = text;
      list.appendChild( picture );
    }
  },

  getPictures: function() {
    var pictureSpace = document.getElementById( 'picture-space' );
    pictureSpace.innerText = "";
    var request = new XMLHttpRequest();
    request.open( 'GET', this.url );
    request.setRequestHeader("Content-Type", "application/json")
    request.onload = () => {
      if( request.status === 200 ) {
        var pictures = JSON.parse( request.responseText );
        this.pictures = pictures;
        this.display();
      }
    }
    request.send( null );
  },
}

module.exports = ImageGrabber;