var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$timeout) {
    $scope.helloWorld = "Hello World!!";

    $scope.inputMatrix = 
    [[1, 1, 1, 1, 1, 0, 0, 1, 1, 1 ],
            [ 0, 1, 1, 1, 1, 1, 0, 1, 0, 1 ],
            [ 0, 0, 1, 0, 1, 1, 1, 0, 0, 1 ],
            [ 1, 0, 1, 1, 1, 0, 1, 1, 0, 1 ],
            [ 0, 0, 0, 1, 0, 0, 0, 1, 0, 1 ],
            [ 1, 0, 1, 1, 1, 0, 0, 1, 1, 0 ],
            [ 0, 0, 0, 0, 1, 0, 0, 1, 0, 1 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 1, 1, 1, 1, 1, 0, 0, 1, 1, 1 ],
            [ 0, 0, 1, 0, 0, 1, 1, 0, 0, 1]]

    $scope.xPaths=[-1,0,0,1];
    $scope.yPaths=[0,-1,1,0];
    $scope.obstacle=0;
    $scope.noOfRows = 10;
    $scope.noOfColumns =10;
    $scope.pathLength=4;
    $scope.initPos=[0,0];
    $scope.targetPos=[7,5];






    $scope.initNode = {};
    $scope.targetNode = {};
    $scope.inputMatrixNodes = [];

    for(var indexO in $scope.inputMatrix){
      var inputMatrixInnr = [];
      for(var indexI in $scope.inputMatrix[indexO]){
        var isSource = false;
        var isTarget = false;
        var isObstacle = false;
        if(indexO == $scope.initPos[0] && indexI == $scope.initPos[1]){
          isSource = true;
        }
        if(indexO == $scope.targetPos[0] && indexI == $scope.targetPos[1]){
          isTarget =true;
        }
        if($scope.inputMatrix[indexO][indexI] == $scope.obstacle){
          isObstacle=true;
        }  

        var temp = {
          'x':indexO,
          'y':indexI,
          'isVisited':false,
          'isSource':isSource,
          'isTarget':isTarget,
          'isObstacle':isObstacle,
          'isInQueue':false,
          'distFromSource':0,
          'value':$scope.inputMatrix[indexO][indexI]
        }
        if(isSource){
          $scope.initNode = temp;
        }
        inputMatrixInnr.push(temp);
      }
      $scope.inputMatrixNodes.push(inputMatrixInnr);
    }

    $scope.isValidMove = function(originalMatrix,noOfRows,noOfColumns,currX,currY){
          var f1= currX >= 0;
          var f2 = currX < noOfRows;
          var f3 = currY >= 0;
          var f4 = currY < noOfColumns;
          var f5 = f1 && f2 && f3 && f4;
          if(f5){
            var f6 = !$scope.inputMatrixNodes[currX][currY].isVisited;
            var f7 = !originalMatrix[currX][currY].isObstacle;
            return   f5 && f6 && f7;
          }
          return f5;
  }


  $scope.search = function(originalMatrix,noOfRows,noOfColumns,initNode,targetNode){

    // create an empty queue
    var queue = [];

    // mark source cell as visited and enqueue the source node
    $scope.inputMatrixNodes[initNode.x][initNode.y].isVisited=true;
    queue.push(initNode);

    // run till queue is not empty
    while (queue.length!=0){
      
      // pop front node from queue and process it
         var currNode = queue.shift();

        // if destination is found, update Result and stop
        if(currNode.isTarget){
            return;
        }

        // check for all possible movements from current cell
        // and enqueue each valid movement
        for(var i = 0;i<$scope.pathLength;i++){

            var currX = parseInt(currNode.x)+$scope.xPaths[i];
            var currY = parseInt(currNode.y)+$scope.yPaths[i];
          
            // check if it is possible to go to position
            if($scope.isValidMove(originalMatrix,noOfRows,noOfColumns,currX,currY)){
                // mark next cell as visited and enqueue it
                var nextNode = $scope.inputMatrixNodes[currX][currY];
                $scope.inputMatrixNodes[currX][currY].isVisited=true;
                $scope.inputMatrixNodes[currX][currY].distFromSource = currNode.distFromSource+1;
                queue.push(nextNode);
            }
        }
    }
}

$scope.start = function(){
   $scope.search($scope.inputMatrixNodes,$scope.noOfRows,$scope.noOfColumns,$scope.initNode,$scope.targetNode);
}
});

