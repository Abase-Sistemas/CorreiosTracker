app.factory('dadosService', function($localStorage) {
  
  $localStorage = $localStorage.$default({
    encomendas: []
  });
  
  return {
    retornarTodos: function() {
      return $localStorage.encomendas;
    },
    incluir: function(dados) {
      $localStorage.encomendas.push(dados);
    },
    excluir: function(dados) {
      $localStorage.encomendas.splice($localStorage.encomendas.indexOf(dados), 1);
    }
  };
});