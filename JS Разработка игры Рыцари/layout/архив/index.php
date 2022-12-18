<!DOCTYPE html>
<html lang="ru-RU">
<head>
    <meta charset="UTF-8">
    <title>Orcs vs. Knights</title>
    <link rel="stylesheet" href="assets/css/base.css">
    <script src="code.js"></script>
</head>
<body>
<div class="screen screen-start show">
    <div class="panel">
        <h1>The Orcs vs Knights</h1>
        <ul>
            <li>Enter your name and press the start button</li>
            <li>Go ahead by overcoming the obstacles</li>
            <li>Destroy the monsters in your path</li>
            <li>Use the skills to fight monsters</li>
            <li>Each skill uses MP, but MP regenerates by 5MP/sec</li>
        </ul>
        <form action="<?php $_SERVER['REQUEST_SELF']?>" method="POST">
            <input type="text" placeholder="Enter your name, Hero!" 
            name="hero">
            <!-- <input type="submit" value="Next!"> -->
            <!-- <input type="submit" value="Next!" onclick="hidef()"> -->
            <input type="submit" value="Next!">
        </form>
    </div>
</div>
<div class="screen screen-game">
    <div class="game-panel game-panel-user">
        <div class="user-info">Username<span> 55</span></div>
        <div class="panel-xp">
            <div class="score-value">
                <span>100</span>
            </div>
        </div>
        <div class="panel-mp">
            <div class="score-value">
                <span>100</span>
            </div>
        </div>
    </div>

    <div class="game-panel game-panel-scores">
        <div class="timer">Time: 00:00</div>
        <div class="kills">Killed: 0</div>
    </div>

    <div class="game-panel game-panel-skills">
        <img src="assets/img/skill-sword.png" alt="sword">
        <img src="assets/img/skill-shield.png" alt="shield">
        <img src="assets/img/skill-sword-3.png" alt="sword 3">
        <img src="assets/img/skill-sword-8.png" alt="sword 8">
    </div>
</div>
<div class="screen screen-ranking">
    <div class="panel">
        <h1>Rating of Heroes!</h1>
        <table>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Killed mosters</th>
                <th>Time</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Konstantin</td>
                <td>100</td>
                <td>02:12</td>
            </tr>
        </table>
        <button>Start again!</button>
    </div>
</div>
<script type="text/javascript">
        <?php
        if ($_SERVER['REQUEST_METHOD']==POST)   
            {
            $hero = $_POST['hero'];
            // echo "alert($hero);";
            // $setname = isset($_POST['hero']);
            if ( !is_null($hero)) {
                echo "ref=document.getElementsByClassName('panel')[0];";
                echo 'ref.style.visibility = "hidden";'; 
                echo "ref=document.getElementsByClassName('panel')[1];";
                echo 'ref.style.visibility = "hidden";';

                }
            else {
                echo "ref=document.getElementsByClassName('panel')[0];";
                echo 'ref.style.visibility = "hidden";';

            }    
            }
    ?>
</script>    

</body>
</html>
