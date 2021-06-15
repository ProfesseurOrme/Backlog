<?php

namespace App\Controller;

use App\Entity\Game;
use App\Entity\Status;
use App\Entity\UserGameStatus;
use App\Services\GameChecker\GameChecker;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * Class GameController
 * @package App\Controller
 * @Route("/api", name="api_")
 */
class ApiGameController extends AbstractApiController
{
		public $normalizer;
		public $gameChecker;
		public $entityManager;

		public function __construct(
			SerializerInterface $serializer,
			NormalizerInterface $normalizer,
			GameChecker $gameChecker,
			EntityManagerInterface $entityManager
		)
		{
			parent::__construct($serializer);
			$this->normalizer = $normalizer;
			$this->gameChecker = $gameChecker;
			$this->entityManager = $entityManager;
		}

		/**
		* @Route("/games", name="get_games", methods={"GET"})
	  * @return Response
		*/
		public function getGames(): Response
		{
			$data= $this->getUser()->getUserGameStatuses();
			$games = [];
			$platforms = [];

			foreach ($data as $item) {
				foreach ($item->getGame()->getPlatforms() as $platform) {
					$platforms[] = [
						"name" => $platform->getName(),
						"uuid" => $platform->getUuid()
					];
				}
				$games[] = [
					"name" => $item->getGame()->getName(),
					"slug" => $item->getGame()->getSlug(),
					"uuid" => $item->getGame()->getUuid(),
					"status" => intval($item->getStatus()->getId()),
					"platforms" => $platforms
				];
				$platforms = [];
			}

			return $this->respond($games);
		}

		/**
		* @Route("/games", name="add_game", methods={"POST"})
		* @param Request $request
		* @return Response
		*/
		public function setGame(Request $request): Response
		{
			$game = $this->deserializeData($request->getContent(),Game::class);

			$this->gameChecker->addThisGameToUser($game, $this->getUser());

			return $this->respondWithCode(Response::HTTP_CREATED, "Game added !");
		}

		/**
		* @Route("/games/{uuid}-{slug}/status/{id}", name="change_game_status", methods={"PUT"})
		* @ParamConverter("game", options={"mapping": {"uuid": "uuid", "slug": "slug"}})
		* @param Game $game
		* @param Status $status
		* @return Response
		*/
		public function setGameStatus(Game $game, Status $status): Response
		{
			$game = $this->entityManager->getRepository(UserGameStatus::class)->getGamePerUser($game->getId(), $this->getUser()->getId());

			$game->setStatus($status);
			$this->entityManager->flush();

			return $this->respondWithCode(Response::HTTP_OK, "Status updated !");
		}
}
