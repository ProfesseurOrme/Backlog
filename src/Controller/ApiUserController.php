<?php

namespace App\Controller;

use App\Entity\User;
use App\Updater\Updater;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/users", name="api_user")
 */
class ApiUserController extends AbstractApiController
{
		protected $updater;
		protected $entityManager;

		public function __construct(SerializerInterface $serializer, Updater $updater, EntityManagerInterface $entityManager)
		{
			parent::__construct($serializer);
			$this->updater = $updater;
			$this->entityManager = $entityManager;
		}

	/**
	 * @Route("/register", name="api_user_register", methods={"POST"})
	 * @param Request $request
	 * @param UserPasswordEncoderInterface $encoder
	 * @return Response
	 */
    public function register(Request $request, UserPasswordEncoderInterface $encoder): Response
    {
			try {
				$user = self::deserializeData($request->getContent(), User::class);
				$user->setRoles(["ROLE_USER"]);
				$user->setPassword($encoder->encodePassword($user, $user->getPassword()));
				$user->setCreatedAt(new \DateTime("NOW"));

				$checkIfObjectHasErrorsAndAdd = $this->updater->addObject($user);

				if(is_array($checkIfObjectHasErrorsAndAdd)){
					return $this->respondWithErrors($checkIfObjectHasErrorsAndAdd);
				}

			} catch (\Exception $exception) {
				throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR,"The data sent is incorrect. Please try again !");
			}

			return $this->respondWithCode(Response::HTTP_CREATED,"User has been created !");
    }

		/**
		 * @Route("/check_user", name="api_user_check_user", methods={"POST"})
		 */
    public function checkIfUserExist(Request $request) :Response
		{
			$user = self::deserializeData($request->getContent(), User::class);

			$userRepo = $this->entityManager->getRepository(User::class)->findOneBy(["username" => $user->getUsername()]);

			if($userRepo) {
				return $this->respondWithCode(Response::HTTP_CONFLICT, "Username is already taken. Try Again.");
			} else {
				return $this->respondWithCode(Response::HTTP_OK, "Username is not taken.");
			}
		}
}
