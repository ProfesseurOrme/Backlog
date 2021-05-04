<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class GameController
 * @package App\Controller
 * @Route("/api")
 */
class ApiGameController extends AbstractApiController
{

    /**
     * @Route("/games", name="game_list")
     */
    public function index(): Response
		{
			$games = [
				[
					'id' => 1,
					'name' => 'Olususi Oluyemi',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
					'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
				],
				[
					'id' => 2,
					'name' => 'Camila Terry',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
					'imageURL' => 'https://randomuser.me/api/portraits/men/42.jpg'
				],
				[
					'id' => 3,
					'name' => 'Joel Williamson',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
					'imageURL' => 'https://randomuser.me/api/portraits/women/67.jpg'
				],
				[
					'id' => 4,
					'name' => 'Deann Payne',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
					'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
				],
				[
					'id' => 5,
					'name' => 'Donald Perkins',
					'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
					'imageURL' => 'https://randomuser.me/api/portraits/men/89.jpg'
				]
			];

			return $this->respond($games);
    }
}
