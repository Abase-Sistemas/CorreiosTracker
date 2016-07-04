app.controller('appController', ['$scope', 'dadosService', 'rastreioService', '$ionicPopup', '$ionicModal', function ($scope, dadosService, rastreioService, $ionicPopup, $ionicModal) {

    $scope.model = {
        nome: '',
        codigoRastreio: ''
    }

    $scope.encomendas = [];

    $ionicModal.fromTemplateUrl('templates/rastreio.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalRastreio = modal;
    });

    $scope.carregarDados = function () {
        $scope.encomendas = [];
        $scope.encomendas = dadosService.retornarTodos();
    }

    $scope.novaEncomenda = function () {
        $scope.model.nome = '';
        $scope.model.codigoRastreio = '';
        var EncomendaPopup = $ionicPopup.show({
            templateUrl: 'templates/novaEncomenda.html',
            title: 'Rastreio de Objeto',
            subTitle: 'Informe os dados para cadastro do objeto',
            scope: $scope,
            buttons: [
                { text: 'Cancelar' },
                {
                    text: '<b>Salvar</b>',
                    type: 'button-balanced',
                    onTap: function (e) {
                        if (!$scope.model.codigoRastreio) {
                            e.preventDefault();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Atenção!',
                                template: 'Informe ao menos o Codigo de Rastreio'
                            });
                        } else {
                            dadosService.incluir($scope.model);
                            $scope.carregarDados();
                            return $scope.model.codigoRastreio;
                        }
                    }
                }
            ]
        });
    }

    $scope.excluir = function (item) {
        dadosService.excluir(item);
        $scope.carregarDados();
    }

    $scope.rastrear = function (item) {
        rastreioService.rastrear(item.codigoRastreio).then(function (dados) {
            console.log(dados);
            if (dados.status == 404) {
                $ionicPopup.alert({
                    title: 'Atenção!',
                    template: dados.statusText
                });
            }
            else {
                $scope.objeto = dados.data;
                $scope.objeto.nome = item.nome;
                $scope.modalRastreio.show();
            }
        });
    }

}]);