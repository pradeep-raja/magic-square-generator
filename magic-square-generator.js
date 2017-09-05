$(function () {
    $("#id-submit").click(function () {
        $("#id-magic").focus();
    });
    $("#id-magic").focus();
});

angular.module("magic-square", []).controller("MagicSquareController", function ($scope) {
    function next(n, d) {
        n = n + 1
        if (n == d) {
            n = n - d
        }
        return n;
    }

    function prev(n, d) {
        n = n - 1
        if (n == -1) {
            n = d - 1
        }
        return n;
    }

    $scope.onGenerate = function () {
        $("#id-magic").focus();
        var a = [];
        var magic = $scope.imagic;
        if (!magic || magic == 0) {
            $scope.arr = a;
            return;
        }

        if (isNaN(magic)) {
            $scope.invalid = true;
        } else {
            $scope.invalid = false;
        }

        if (magic % 2 == 0) {
            $scope.odd = true;
            $scope.big = false;

            return
        } else if (magic > 91) {
            $scope.odd = false;
            $scope.big = true;
            return;

        } else {
            $scope.odd = false;
            $scope.big = false;

        }

        var fontSize = 45 - magic;
        if (magic > 26) {
            fontSize = fontSize + 5;
        } else if (magic > 50) {
            fontSize = fontSize + 10;
        }
        if (fontSize < 9) {
            fontSize = 9;
        }


        $("#id-table").css("font-size", fontSize + "px");

        for (var i = 0; i < magic; i++) {
            var t = [];
            for (var j = 0; j < magic; j++) {
                t.push(0);
            }
            a.push(t);
        }

        var n = 1;
        var xx = 0;
        var yy = parseInt(magic / 2);

        var d = magic;
        a[xx][yy] = n;
        while (1) {
            var x1 = prev(xx, d);
            var y1 = next(yy, d);
            if (a[x1][y1] == 0) {
                xx = x1;
                yy = y1;
                n = n + 1;
                a[xx][yy] = n;
            } else {
                y1 = yy;
                x1 = next(xx, d);

                if (a[x1][y1] == 0) {
                    xx = x1;
                    yy = y1;
                    n = n + 1;
                    a[xx][yy] = n;
                } else {
                    break;
                }
            }
        }

        $scope.arr = a;

    }
    $scope.arr = [];
    $scope.odd = false;
    $scope.big = false;
    $("#id-magic").focus();
})