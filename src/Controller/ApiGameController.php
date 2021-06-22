<?php

namespace App\Controller;

use App\Entity\Game;
use App\Entity\Rating;
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
 * @Route("/api/games/", name="api_game")
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
		* @Route("", name="_get", methods={"GET"})
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
		* @Route("", name="_add", methods={"POST"})
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
		* @Route("{uuid}-{slug}/status/{id}", name="_get_status_update", methods={"PUT"})
		* @ParamConverter("game", options={"mapping": {"uuid": "uuid", "slug": "slug"}})
		* @param Game $game
		* @param Status $status
		* @return Response
		*/
		public function setGameStatus(Game $game, Status $status): Response
		{
			$game = $this->entityManager->getRepository(UserGameStatus::class)->findGamePerUser($game->getId(), $this->getUser
			()->getId());

			$game->setStatus($status);
			$this->entityManager->flush();

			return $this->respondWithCode(Response::HTTP_OK, "Status updated !");
		}

	/**
	 * @Route("{uuid}/ratings/", name="_rating_get", methods={"GET"})
	 */
	public function getGameRating(Game $game) : Response
	{

		$rating = $this->entityManager->getRepository(Rating::class)->findGameRating($game->getUuid(), $this->getUser()->getId());

		if($rating) {
			return $this->respond(["id" => $rating->getId(),"rating" => $rating->getRating(), "addedAt" => $rating->getAddedAt()]);
		} else {
			return $this->respondNotFound("You did not rate this game");
		}
	}

	/**
	 * @Route("{uuid}/ratings/", name="_get_rating_add", methods={"POST"})
	 */
	public function setGameRating(Request $request, Game $game) : Response
	{
		$rating = $this->deserializeData($request->getContent(),  Rating::class)
			->setAddedAt(new \DateTime())
			->setGame($game)
			->setUser($this->getUser())
		;
		$this->entityManager->persist($rating);
		$this->entityManager->flush();

		return $this->respondCreated("You have rated this game");
	}

	/**
	 * @Route("{uuid}/ratings/{id}", name="_get_rating_update", methods={"PUT"})
	 * @ParamConverter("game", options={"mapping": {"uuid": "uuid"}})
	 */
	public function updateGameRating(Request $request, Game $game, Rating $rating) : Response
	{
		if($rating) {

			$newRating = $this->deserializeData($request->getContent(),  Rating::class);

			$rating->setRating($newRating->getRating());

			$this->entityManager->flush();

			return $this->respondUpdated("You have updated the game's rating");
		} else {
			return $this->respondNotFound("You have not rated this game. Please try again");
		}
	}

	/**
	 * @Route("{uuid}/statistics/", name="_get_statistics", methods={"GET"})
	 */
	public function getGameStatistics(Game $game) :Response
	{
		$gameRepository = $this->entityManager->getRepository(UserGameStatus::class);
		$nbPlayers = $gameRepository->findNbPlayers($game->getUuid());

		$ratingRepository = $this->entityManager->getRepository(Rating::class);

		$statistics = [
			"rating" => $ratingRepository->findGameAverageRating($game->getUuid()),
			"nb_players" => $nbPlayers ? $nbPlayers : "0",
			"statistics" => [
				"to_do" => $gameRepository->findGameStatisticsPerStatus(1, $game->getUuid()),
				"in_progress" => $gameRepository->findGameStatisticsPerStatus(2, $game->getUuid()),
				"finished" => $gameRepository->findGameStatisticsPerStatus(3, $game->getUuid())
			]
		];

		return $this->respond($statistics);
	}
}
