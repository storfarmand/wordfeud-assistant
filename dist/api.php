<?php ini_set('session.gc_probability',1); ?>
<?php ini_set('session.gc_divisor',1); ?>
<?php

session_start();

$validActions = array("login", "listGames", "getGame", "playMove");
if (!in_array('action', $_REQUEST) || !in_array($_REQUEST['action'], $validActions))

$action = ($_REQUEST['action']);

require_once("Wordfeud.php");

$WF = new Wordfeud();
$resp = new stdClass();

switch ($action) {
  case 'login':
    $WF->logInUsingEmail($_REQUEST['email'], $_REQUEST['password']);
    $resp->sessionId = $WF->getSessionId();
    header('Content-Type: application/json');
    echo json_encode($resp);
    return;
    break;
  case 'gamesList':
    $WF->setSessionId($_REQUEST['sessionId']);
    $resp->games = $WF->getGames();
    header('Content-Type: application/json');
    echo json_encode($resp);
    return;
    break;
  case 'getGame':
    $WF->setSessionId($_REQUEST['sessionId']);
    $resp->game = $WF->getGame($_REQUEST['gameId']);
    header('Content-Type: application/json');
    echo json_encode($resp);
    break;
  case 'getBoard':
    $WF->setSessionId($_REQUEST['sessionId']);
    $resp->board = $WF->getBoard($_REQUEST['boardId']);
    header('Content-Type: application/json');
    echo json_encode($resp);
    return;
    break;
  default:
    break;
}

try {
    // Log in with an existing account

    // Show your Wordfeud Session ID

    // Search for a user by username or email address
    //$searchResults = $WF->searchUser("RandomUser");

    // Check search results
    /*
    if (count($searchResults) > 0) {
        $usr = $searchResults[0];
        echo "Found a user called <b>" . $usr['username'] . "</b> ";
        echo "(user id: " . $usr['user_id'] . ").<br />";
    } else {
        echo "User not found!<br />";
    }
    */

    // Request game with a random opponent
    //$resp->games = $WF->getGames();
    //header('Content-Type: application/json');
    //echo json_encode($resp);
/*
    // Look at game
    $request = $WF->getGame(2126462161);
    echo "Request sent!<br /><pre>";
    var_dump($request);
    echo "</pre>";

    // Play word
    $tiles = [[0,0,"F",false],[0,1,"L",false],[0,2,"O",false],[0,3,"T",false]];
    $word = "FLOT";
    //$request = $WF->place(2126462161, 3, $tiles, $word);
    echo "Request sent!<br /><pre>";
    var_dump($request);
    echo "</pre>";
*/
    // Log out (not really necessary)
    //$WF->logOut();
}
catch (WordfeudLogInException $ex) {
    echo "Authentication failed!";
}
catch (WordfeudHttpException $ex) {
    echo "Server did respond with HTTP status code 200 (OK)";
}
catch (WordfeudJsonException $ex) {
    echo "Could not decode JSON data received from the server";
}
catch (WordfeudException $ex) {
    echo "The following error occured: " . $ex->getMessage();
}
