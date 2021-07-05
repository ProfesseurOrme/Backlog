<?php

namespace App\Controller;

use App\Entity\Game;
use App\Entity\Rating;
use App\Entity\Status;
use App\Entity\UserGameStatus;
use App\Services\GameChecker\GameChecker;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface as JMS;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface as SFSerializer;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * Class GameController
 * @package App\Controller
 * @Route("{_locale}/api/games/", name="api_game", requirements={"_locale" : "en|fr"})
 */
class ApiGameController extends AbstractApiController
{
		protected $gameChecker;
		protected $entityManager;
		protected $translation;

		public function __construct(
			JMS $serializer,
			SFSerializer $sfSerializer,
			GameChecker $gameChecker,
			EntityManagerInterface $entityManager,
			TranslatorInterface $translation
		)
		{
			parent::__construct($serializer, $sfSerializer);
			$this->gameChecker = $gameChecker;
			$this->entityManager = $entityManager;
			$this->translation = $translation;
		}

		/**
		* @Route("", name="_get", methods={"GET"})
	  * @return Response
		*/
		public function getGames(): Response
		{
			$games = $this->entityManager->getRepository(Game::class)->findUserGames($this->getUser()->getUsername(), $this->getUser()->getId());

			return $this->respond($games, SerializationContext::create()->setGroups(["user_games"]));
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

			return $this->respondWithCode(Response::HTTP_CREATED, $this->translation->trans("game.add"));
		}

		/**
		* @Route("{uuid}/status/{id}", name="_get_status_update", methods={"PUT"})
		* @ParamConverter("game", options={"mapping": {"uuid": "uuid"}})
		* @param Game $game
		* @param Status $status
		* @return Response
		*/
		public function setGameStatus(Game $game, Status $status): Response
		{
			$game = $this->entityManager->getRepository(UserGameStatus::class)->findGamePerUser($game->getId(), $this->getUser()->getId());

			$game->setStatus($status);
			$this->entityManager->flush();

			return $this->respondWithCode(Response::HTTP_OK, $this->translation->trans("game.status.updated"));
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
			return $this->respondNotFound($this->translation->trans("game.rating.error"));
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

		return $this->respondCreated($this->translation->trans("game.rating.success"));
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

			return $this->respondUpdated($this->translation->trans("game.rating.updated"));
		} else {
			return $this->respondNotFound($this->translation->trans("game.rating.error"));
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
